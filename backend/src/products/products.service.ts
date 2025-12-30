/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from '@nestjs/common';
import { OptimizeDto } from './dto/optimize.dto';

export type NormalizedProduct = {
  barcode: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  categories?: string[];
  ecoscore?: string | null;
  novaGroup?: number | null;
  sustainabilityScore: number;
};

export type OptimizeResult = {
  selected: {
    id: string;
    name: string;
    price: number;
    sustainabilityScore: number;
  }[];
  totals: {
    totalPrice: number;
    avgSustainability: number;
  };
};

type OpenFoodFactsResponse = {
  status?: number;
  product?: {
    product_name?: string;
    product_name_es?: string;
    product_name_en?: string;
    brands?: string;
    image_url?: string;
    categories?: string;
    ecoscore_grade?: string;
    nova_group?: number;
  };
};

@Injectable()
export class ProductsService {
  // GET /products/barcode/:barcode

  private calculateSustainabilityScore(
    ecoscore?: string | null,
    novaGroup?: number | null,
  ): number {
    const ecoscoreMap: Record<string, number> = {
      a: 100,
      b: 80,
      c: 60,
      d: 40,
      e: 20,
    };

    const ecoScore = ecoscore
      ? (ecoscoreMap[ecoscore.toLowerCase()] ?? 50)
      : 50;

    let novaPenalty = 0;
    if (novaGroup === 2) novaPenalty = 10;
    if (novaGroup === 3) novaPenalty = 20;
    if (novaGroup === 4) novaPenalty = 35;

    const score = ecoScore - novaPenalty;
    return Math.max(0, Math.min(100, score));
  }
  async getByBarcode(barcode: string): Promise<NormalizedProduct> {
    const res = await fetch(
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
    );

    if (!res.ok) {
      throw new NotFoundException('No se pudo consultar OpenFoodFacts');
    }

    const data = (await res.json()) as OpenFoodFactsResponse;

    if (!data || data.status !== 1 || !data.product) {
      throw new NotFoundException('Producto no encontrado');
    }

    const p = data.product;
    // eslint-disable-next-line prettier/prettier
  
    const sustainabilityScore = this.calculateSustainabilityScore(
      p.ecoscore_grade ?? null,
      p.nova_group ?? null,
    );

    return {
      barcode,
      name:
        p.product_name ??
        p.product_name_es ??
        p.product_name_en ??
        'Sin nombre',
      brand: p.brands,
      imageUrl: p.image_url,
      categories:
        typeof p.categories === 'string'
          ? p.categories.split(',').map((c) => c.trim())
          : [],
      ecoscore: p.ecoscore_grade ?? null,
      novaGroup: p.nova_group ?? null,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      sustainabilityScore,
    };
  }

  // POST /products/optimize
  optimize(dto: OptimizeDto): OptimizeResult {
    const { items, budget } = dto;

    let totalPrice = 0;
    const selected: OptimizeResult['selected'] = [];

    for (const item of items) {
      if (totalPrice + item.price <= budget) {
        selected.push(item);
        totalPrice += item.price;
      }
    }

    const avgSustainability =
      selected.length > 0
        ? Math.round(
            selected.reduce((sum, i) => sum + i.sustainabilityScore, 0) /
              selected.length,
          )
        : 0;

    return {
      selected,
      totals: {
        totalPrice,
        avgSustainability,
      },
    };
  }
}
