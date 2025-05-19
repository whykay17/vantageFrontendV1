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
import { ChartModule } from 'primeng/chart'

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [ NgClass, DecimalPipe, DatePipe,SelectModule,DropdownModule,FormsModule,ButtonModule,TooltipModule,ChartModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {

  dashboardData: any;
  periodData:any;
  latestVideoData:any;
  bestVideoData:any;
  engagementData:any;

  pieData : any;
  graphData : any;
  
  pieOptions = {
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
      x: {display:false},
      y: {display:false}  
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      }
    }
}

  lineOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff',
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: '#2a2a40',
        titleColor: '#ffffff',
        bodyColor: '#e0e0e0',
        borderColor: '#444',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        ticks: {color: '#cccccc'},
        grid: {color: '#333333'}
      },
      y: {
        ticks: {color: '#cccccc'},
        grid: {color: '#333333'}
      }
    }
  };

  periodRange=30;
  bestRange=90;
  engagementRange=90;

  rangeData = [
    { name: "7 days", value: 7 },
    { name: "1 Month", value: 30 },
    { name: "3 Months", value: 90 },
    { name: "1 Year", value: 365 },
    { name:"All time",value:3000}
  ];

  constructor(private spinner:NgxSpinnerService,private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    var storedOverview = this.authService.getStorage('overviewData');
    var storedPeriod = this.authService.getStorage('periodData');
    var storedLatestVideo = this.authService.getStorage('latestVideoData');
    var storedBestVideo = this.authService.getStorage('bestVideoData');
    var storedEngagement = this.authService.getStorage('engagementData');
    if (storedOverview && storedPeriod && storedLatestVideo && storedBestVideo && storedEngagement) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
      this.latestVideoData = storedLatestVideo;
      this.bestVideoData = storedBestVideo;
      this.setEngagementCharts(storedEngagement);
    } else {
      console.log(storedOverview,storedPeriod,storedLatestVideo,storedBestVideo,storedEngagement);
      this.getDashboardAPI();
      this.getPeriodAPI(this.periodRange);
      this.getLatestVideoAPI();
      this.getBestVideoAPI(this.bestRange);
      this.getEngagementAPI(this.engagementRange);
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

  getEngagementAPI(range:number){
    this.spinner.show();
    this.dashboardService.getEngagementStats(range).subscribe({
      next:(data) => {
        this.periodData=data;
        this.setEngagementCharts(data);
        sessionStorage.setItem('engagementData', JSON.stringify(data));
        this.spinner.hide();
      },
      error:() => {
        this.spinner.hide();
      }
    })
  }

  setEngagementCharts(data:any){
    this.pieData = {
      labels: ['Likes', 'Comments', 'Shares'],
      datasets: [
        {
          data: [
            data.likes || 0,
            data.comments || 0,
            data.shares || 0
          ],
          backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
          borderWidth: 0
        }
      ]
    };
    this.graphData = {
      labels: data?.line_data.labels || [],
      datasets: [
        {
          label: 'Likes',
          data: data?.line_data.likes || [],
          fill: false,
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.5,
          pointRadius: 1,
          pointHoverRadius: 5
        },
        {
          label: 'Comments',
          data: data?.line_data.comments || [],
          fill: false,
          borderColor: '#10b981',
          backgroundColor: '#10b981',
          tension: 0.5,
          pointRadius: 2,
          pointHoverRadius: 5
        },
        {
          label: 'Shares',
          data: data?.line_data.shares || [],
          fill: false,
          borderColor: '#f59e0b',
          backgroundColor: '#f59e0b',
          tension: 0.5,
          pointRadius: 2,
          pointHoverRadius: 5
        }
      ]
    };
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
