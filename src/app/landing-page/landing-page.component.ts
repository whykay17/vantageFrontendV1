import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InViewportDirective } from '../directives/in-viewport.directive';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, ButtonModule,InViewportDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{

  constructor(private router:Router,private spinner:NgxSpinnerService,public authService: AuthService) {}

  sectionVisible = {
    hero: false,
    features: false,
    howItWorks: false,
    about: false,
    cta: false
  };

  onViewportChange(section: keyof typeof this.sectionVisible, event: boolean) {
    console.log(`Viewport change: ${section}`, event);
    this.sectionVisible[section] = event;
  }

  login(){
    this.authService.login();
  }

  ngOnInit() {
    this.spinner.show();
    this.authService.isAuthenticated$.subscribe(auth =>{
      // this.router.navigate(['/home']);
    })
    this.spinner.hide();
  }

}
