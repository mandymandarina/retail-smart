import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../../environments/environment-prod';

export type Product = {
  barcode: string;
  name: string;
  brand?: string;
  imageUrl?: string;
  categories?: string[];
  ecoscore?: string | null;
  novaGroup?: number | null;
};

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss'],
})
export class ProductSearchComponent {
  barcode = '';
  loading = false;
  error = '';
  product: Product | null = null;

  private apiUrl = environment.apiUrl;;

  constructor(private http: HttpClient) {}

  search() {
    const code = this.barcode.trim();
    if (!code) return;

    this.loading = true;
    this.error = '';
    this.product = null;

    this.http.get<Product>(`${this.apiUrl}/products/barcode/${encodeURIComponent(code)}`)
      .subscribe({
        next: (p) => {
          this.product = p;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.error = err?.error?.message ?? 'Error consultando el producto';
        },
      });
  }

  fillExample() {
    this.barcode = '3017620422003';
  }

  clear() {
    this.barcode = '';
    this.product = null;
    this.error = '';
  }
}
