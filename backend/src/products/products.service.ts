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
