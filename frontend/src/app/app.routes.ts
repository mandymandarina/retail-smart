import { Routes } from '@angular/router';
import { ProductSearchComponent } from '../app/pages/product-search/product-search.component';
import { ShoppingListComponent } from '../app/pages/shopping-list/shopping-list.component'

export const routes: Routes = [
    { path: '', redirectTo: 'search', pathMatch: 'full' },
    { path: 'search', component: ProductSearchComponent },
    { path: 'optimize', component: ShoppingListComponent },
  ];
