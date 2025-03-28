import { Component,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isMenuOpen =  false;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.isMenuOpen = false;
  }

  toggleMenu(): void {
    this.isMenuOpen =!this.isMenuOpen;
  }
}
