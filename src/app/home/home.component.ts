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
  periodData:any;

  constructor(private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    var storedOverview = this.authService.getStorage('overviewData');
    var storedPeriod = this.authService.getStorage('periodData');
    if (storedOverview) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
    } else {
      this.getDashboardAPI();
      this.getPeriodAPI(30);
     }
  }

  getDashboardAPI() {
    this.dashboardService.getDashboardData().subscribe(data => {
      this.dashboardData = data;
      sessionStorage.setItem('overviewData', JSON.stringify(data));
    }
    )
  }

  getPeriodAPI(range:number){
    this.dashboardService.getPeriodStats(range).subscribe(data => {
      this.periodData=data;
      sessionStorage.setItem('periodData',JSON.stringify(data))
    })
  }
}
