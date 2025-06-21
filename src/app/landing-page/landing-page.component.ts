import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InViewportDirective } from '../directives/in-viewport.directive';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule,InViewportDirective],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})
export class LandingPageComponent{

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


  ngOnInit() {
    // Any initialization logic
  }

}
