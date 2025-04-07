import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dashboardData: any;

  constructor(private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    var currentData = this.authService.getStorage('dashboardData');
    if (currentData) {
      this.dashboardData = currentData;
    } else {
      this.getDashboardAPI();
     }
  }

  getDashboardAPI() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      sessionStorage.setItem('dashboardData', JSON.stringify(this.dashboardData));
    }
    )
  }
}
