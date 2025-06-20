import { Component } from '@angular/core';
import { BackgroundComponent } from '../../background/background.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { FooterComponent } from '../../footer/footer.component';
import { ToastModule } from 'primeng/toast';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-app-layout',
  providers: [ MessageService],
  imports: [BackgroundComponent,NavbarComponent,FooterComponent,ToastModule,RouterOutlet,NgxSpinnerModule],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.css'
})
export class AppLayoutComponent {

}
