import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment-prod';

export type Product = {
  barcode: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  categories?: string[];
  ecoscore?: string | null;
  novaGroup?: number | null;
  sustainabilityScore: number;
};

export type OptimizeItem = {
  id: string;
  name: string;
  price: number;
  sustainabilityScore: number;
};

export type OptimizeDto = {
  items: OptimizeItem[];
  budget: number;
};

export type OptimizeResult = {
  selected: OptimizeItem[];
  totals: {
    totalPrice: number;
    avgSustainability: number;
  };
};

export type NormalizedProduct = {
  barcode: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  categories?: string[];
  nutriments?: Record<string, unknown>;
  ecoscore?: string | null;
  novaGroup?: number | null;
  sustainabilityScore: number;
};

@Injectable({ providedIn: 'root' })
export class ProductsService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getByBarcode(barcode: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/barcode/${barcode}`);
    
  }

  optimize(dto: OptimizeDto): Observable<OptimizeResult> {
    return this.http.post<OptimizeResult>(`${this.baseUrl}/products/optimize`, dto);
  }
  
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
      ? ecoscoreMap[ecoscore.toLowerCase()] ?? 50
      : 50;
  
    let novaPenalty = 0;
    if (novaGroup === 2) novaPenalty = 10;
    if (novaGroup === 3) novaPenalty = 20;
    if (novaGroup === 4) novaPenalty = 35;
  
    const score = ecoScore - novaPenalty;
  
    return Math.max(0, Math.min(100, score));
  }
  
}
