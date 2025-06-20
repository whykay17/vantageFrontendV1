import { Component } from '@angular/core';
import { BackgroundComponent } from '../../background/background.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  imports: [BackgroundComponent,RouterOutlet],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.css'
})
export class BaseLayoutComponent {

}
