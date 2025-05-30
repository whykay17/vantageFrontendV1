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
import { ChartModule } from 'primeng/chart';
import { pieOptions,lineOptions,stackedOptions} from './chartConfig'

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
  stackedData:any;

  pieOptions=pieOptions
  lineOptions=lineOptions
  stackedOptions=stackedOptions

  pieData : any;
  graphData : any;
  
  periodRange=30;
  bestRange=90;
  engagementRange=90;
  subscriberRange=90;

  rangeData = [
    { name: "7 days", value: 9 },
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
    var storedSubscriber = this.authService.getStorage('subscriberData');
    if (storedOverview && storedPeriod && storedLatestVideo && storedBestVideo && storedEngagement && storedSubscriber) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
      this.latestVideoData = storedLatestVideo;
      this.bestVideoData = storedBestVideo;
      this.setEngagementCharts(storedEngagement);
      this.setSubscriberCharts(storedSubscriber);
    } else {
      this.getDashboardAPI();
      this.getPeriodAPI(this.periodRange);
      this.getLatestVideoAPI();
      this.getBestVideoAPI(this.bestRange);
      this.getEngagementAPI(this.engagementRange);
      this.getSubscriberAPI(this.subscriberRange);
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
        this.engagementData=data;
        this.setEngagementCharts(data);
        sessionStorage.setItem('engagementData', JSON.stringify(data));
        this.spinner.hide();
      },
      error:() => {
        this.spinner.hide();
      }
    })
  }

  getSubscriberAPI(range:number){
    this.spinner.show();
    this.dashboardService.getSubscriberStats(range).subscribe({
      next:(data) => {
        this.setSubscriberCharts(data);
        sessionStorage.setItem('subscriberData', JSON.stringify(data));
        this.spinner.hide();
        console.log(data);
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

  setSubscriberCharts(data:any) {
    this.stackedData = {
      labels: data?.labels,
      datasets: [
        {
          label: 'Subscribers Gained',
          data: data?.subscribersGained,
          backgroundColor: '#4CAF50', // green
          stack: 'subscribers'
        },
        {
          label: 'Subscribers Lost',
          data: data?.subscribersLost,
          backgroundColor: '#F44336', // red
          stack: 'subscribers'
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
