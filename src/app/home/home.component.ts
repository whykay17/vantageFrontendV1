import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'console';
import { DecimalPipe } from '@angular/common';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,NgClass,DecimalPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  dashboardData: any;
  periodData:any;

  periodRange=7;
  rangeData = [
    { name: "7 days", value: 7 },
    { name: "1 Month", value: 28 },
    { name: "3 Months", value: 90 },
    { name: "1 Year", value: 365 }
  ];

  constructor(private spinner:NgxSpinnerService,private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    var storedOverview = this.authService.getStorage('overviewData');
    var storedPeriod = this.authService.getStorage('periodData');
    if (storedOverview) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
    } else {
      this.getDashboardAPI();
      this.getPeriodAPI(this.periodRange);
     }
  }

  getDashboardAPI() {
    this.spinner.show();
    this.dashboardService.getDashboardData().subscribe({next:(data) => {
      this.dashboardData = data;
      sessionStorage.setItem('overviewData', JSON.stringify(data));
      this.spinner.hide();
    },
    error:()=>{
      this.spinner.hide();
    }
  })
  }

  getPeriodAPI(range:number){
    this.spinner.show();
    this.dashboardService.getPeriodStats(range).subscribe({
      next: (data) => {
        this.periodData = data;
        sessionStorage.setItem('periodData', JSON.stringify(data));
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }

  getChange(current: number, previous: number): number {
    if (previous === 0) {
      return current === 0 ? 0 : 100;
    }
    const change = ((current - previous) / Math.abs(previous)) * 100;
    return parseFloat(change.toFixed(1));
  }

  getChangeClass(change: number): string {
    if (change > 0) return 'positive';     // green
    if (change < 0) return 'negative';      // red
    return 'neutral';                       // neutral
  }
  
}
