import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ProductSearchComponent } from "./pages/product-search/product-search.component";
import { ShoppingListComponent } from "./pages/shopping-list/shopping-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ 
    RouterOutlet,
    RouterLink,
    RouterLinkActive,

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
