import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { error } from 'console';
import { DatePipe, DecimalPipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { SelectModule } from 'primeng/select'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ NgClass, DecimalPipe, DatePipe,SelectModule,DropdownModule,FormsModule,ButtonModule,TooltipModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

  dashboardData: any;
  periodData:any;
  latestVideoData:any;
  bestVideoData:any;

  periodRange=28;
  bestRange=90;
  rangeData = [
    { name: "7 days", value: 7 },
    { name: "1 Month", value: 28 },
    { name: "3 Months", value: 90 },
    { name: "1 Year", value: 365 },
    { name:"All time",value:5000}
  ];

  constructor(private spinner:NgxSpinnerService,private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    var storedOverview = this.authService.getStorage('overviewData');
    var storedPeriod = this.authService.getStorage('periodData');
    var storedLatestVideo = this.authService.getStorage('latestVideoData');
    var storedBestVideo = this.authService.getStorage('bestVideoData');
    if (storedOverview) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
      this.latestVideoData = storedLatestVideo;
      this.bestVideoData = storedBestVideo;
    } else {
      this.getDashboardAPI();
      this.getPeriodAPI(this.periodRange);
      this.getLatestVideoAPI();
      this.getBestVideoAPI(this.bestRange);
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
        this.periodRange=range;
        sessionStorage.setItem('periodData', JSON.stringify(data));
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }

  getLatestVideoAPI(){
    this.spinner.show();
    this.dashboardService.getLatestVideoStats().subscribe({
      next:(data) => {
        this.latestVideoData=data;
        sessionStorage.setItem('latestVideoData', JSON.stringify(data));
        this.spinner.hide();
      },
      error: () => {
        this.spinner.hide();
      }
    });
  }

  getBestVideoAPI(range:number){
    this.spinner.show();
    this.dashboardService.getBestVideo(range).subscribe({
      next:(data) => {
        this.bestVideoData=data;
        this.bestRange=range;
        sessionStorage.setItem('bestVideoData',JSON.stringify(data));
        this.spinner.hide();
      },
      error:() => {
        this.spinner.hide();
      }
    })
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

  openVideo(url:string){
    window.open(url,'_blank');
  }
  
}
