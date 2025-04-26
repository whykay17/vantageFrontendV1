import { Component,Renderer2 } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [DrawerModule,ButtonModule],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAuthenticated = false;
  isMenuOpen =  false;

  constructor(private renderer: Renderer2,private authService:AuthService) {

  }

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(auth =>{
      this.isAuthenticated = auth;
    })
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  toggleMenu(): void {
    this.isMenuOpen =!this.isMenuOpen;
  }
}
