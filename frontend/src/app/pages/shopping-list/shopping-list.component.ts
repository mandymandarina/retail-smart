import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsService, OptimizeItem, OptimizeResult } from '../../services/products.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss',
})
export class ShoppingListComponent {

  budget = 10000;
  

  // Inputs
  name = '';
  price: number | null = null;
  sustainabilityScore: number | null = 50;

  // Data
  items: OptimizeItem[] = [];
  result: OptimizeResult | null = null;

  // UI state
  loading = false;
  error = '';

  constructor(private productsService: ProductsService) {}

  addItem(): void {
    this.error = '';
    this.result = null;

    const cleanName = this.name.trim();
    if (!cleanName) {
      this.error = 'Ingresa el nombre del producto.';
      return;
    }
    if (this.price === null || this.price <= 0) {
      this.error = 'Ingresa un precio válido (mayor a 0).';
      return;
    }
    if (this.sustainabilityScore === null || this.sustainabilityScore < 0 || this.sustainabilityScore > 100) {
      this.error = 'La sostenibilidad debe estar entre 0 y 100.';
      return;
    }

    this.items.push({
      id: crypto.randomUUID(),
      name: cleanName,
      price: this.price,
      sustainabilityScore: this.sustainabilityScore,
    });

    this.name = '';
    this.price = null;
    this.sustainabilityScore = 50;
  }

  removeItem(id: string): void {
    this.items = this.items.filter((i) => i.id !== id);
    this.result = null;
  }

  optimize(): void {
    this.error = '';
    this.result = null;

    if (this.budget <= 0) {
      this.error = 'El presupuesto debe ser mayor a 0.';
      return;
    }
    if (this.items.length === 0) {
      this.error = 'Agrega al menos un producto para optimizar.';
      return;
    }

    this.loading = true;

    this.productsService
      .optimize({
        budget: this.budget,
        items: this.items,
      })
      .subscribe({
        next: (res) => {
          this.result = res;
          this.loading = false;
        },
        error: () => {
          this.error = 'No se pudo optimizar la lista (revisa que el backend esté arriba).';
          this.loading = false;
        },
      });
  }

  loadExample(): void {
    this.budget = 10000;
    this.items = [
      { id: crypto.randomUUID(), name: 'Arroz 1kg', price: 2500, sustainabilityScore: 70 },
      { id: crypto.randomUUID(), name: 'Lentejas 1kg', price: 2200, sustainabilityScore: 80 },
      { id: crypto.randomUUID(), name: 'Snack ultra-procesado', price: 1800, sustainabilityScore: 20 },
      { id: crypto.randomUUID(), name: 'Leche', price: 1500, sustainabilityScore: 55 },
    ];
    this.result = null;
    this.error = '';
  }
}
