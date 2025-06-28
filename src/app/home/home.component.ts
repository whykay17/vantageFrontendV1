import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DashboardService } from '../services/dashboard.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DatePipe, DecimalPipe} from '@angular/common';
import { NgClass } from '@angular/common';
import { SelectModule } from 'primeng/select'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js';
import { TreemapController,TreemapElement } from 'chartjs-chart-treemap';
import { pieOptions,lineOptions,stackedOptions,doubleBarOptions,retentionLineOptions,genderAgeBarOptions,devicePieOptions} from './chartConfig'
import { DateRangeComponent } from "../utils/date-range/date-range.component";

Chart.register(TreemapController, TreemapElement);

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [NgClass, DecimalPipe, DatePipe, SelectModule, DropdownModule, FormsModule,
    ButtonModule, TooltipModule, ChartModule, DateRangeComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})

export class HomeComponent {

  dashboardData: any;
  periodData:any;
  latestVideoData:any;
  bestVideoData:any;
  engagementData:any;
  retentionData:any;
  demographicsData:any;

  customRange:any;

  pieOptions=pieOptions
  lineOptions=lineOptions
  stackedOptions=stackedOptions
  doubleBarOptions=doubleBarOptions
  retentionLineOptions=retentionLineOptions
  genderAgeBarOptions=genderAgeBarOptions
  devicePieOptions=devicePieOptions

  pieData : any;
  graphData : any;
  stackedData:any;
  doubleBarData:any;
  retentionLineData:any;
  genderAgeBarData:any;
  countryChartData:any;
  devicePieData:any;

  rangeDefaults = {
    period: '3000',
    best: '3000',
    engagement: '3000',
    subscriber: '3000',
    traffic: '3000',
    retention: '3000',
    demographics: '3000',
    all:'30'
  };
  
  showDateRange:boolean=false;
  rangeSection:string=''
  today=new Date()
  spinnerCount:number = 0;

  rangeData = [
    { name: "7 days", value: '9' },
    { name: "1 Month", value: '30' },
    { name: "3 Months", value: '90' },
    { name: "1 Year", value: '365' },
    { name: "7 Years", value: '2555' },
    { name:"All time",value:'3000'},
    { name:"Custom",value:'custom'}
  ];

  constructor(private spinner:NgxSpinnerService,private authService:AuthService ,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    const storedOverview = this.authService.getStorage('overviewData');
    const storedPeriod = this.authService.getStorage('periodData');
    const storedLatestVideo = this.authService.getStorage('latestVideoData');
    const storedBestVideo = this.authService.getStorage('bestVideoData');
    const storedEngagement = this.authService.getStorage('engagementData');
    const storedSubscriber = this.authService.getStorage('subscriberData');
    const storedTrafficSources = this.authService.getStorage('trafficSourcesData');
    const storedRetention = this.authService.getStorage('retentionData');
    const storedDemographics = this.authService.getStorage('demographicsData');
  
    if (
      storedOverview &&
      storedPeriod &&
      storedLatestVideo &&
      storedBestVideo &&
      storedEngagement &&
      storedSubscriber &&
      storedTrafficSources &&
      storedRetention &&
      storedDemographics
    ) {
      this.dashboardData = storedOverview;
      this.periodData = storedPeriod;
      this.latestVideoData = storedLatestVideo;
      this.bestVideoData = storedBestVideo;
      this.setEngagementCharts(storedEngagement);
      this.setSubscriberCharts(storedSubscriber);
      this.setTrafficSourcesCharts(storedTrafficSources);
      this.setRetentionCharts(storedRetention);
      this.setDemographicsCharts(storedDemographics);
      setTimeout(() => {
        this.setTreemapChart(storedDemographics?.country || []);
      }, 500);
    } else {
      const periodRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.period));
      const bestRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.best));
      const engagementRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.engagement));
      const subscriberRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.subscriber));
      const trafficRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.traffic));
      const retentionRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.retention));
      const demographicsRange = this.getDateDaysAgo(parseInt(this.rangeDefaults.demographics));

      this.getDashboardAPI();
      this.getPeriodAPI(periodRange);
      this.getLatestVideoAPI();
      this.getBestVideoAPI(bestRange);
      this.getEngagementAPI(engagementRange);
      this.getSubscriberAPI(subscriberRange);
      this.getTrafficSourcesAPI(trafficRange);
      this.getRetentionAPI(retentionRange);
      this.getDemographicsAPI(demographicsRange);
    }
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

  onRangeChange(section: string, value: string) {
    if (value === 'custom') {
      this.showDateRange = true;
      this.rangeSection = section;
    } else {
      this.showDateRange = false;
      const dateRange = this.getDateDaysAgo(parseInt(value));
      
      switch (section) {
        case 'period':
          this.getPeriodAPI(dateRange);
          break;
        case 'best':
          this.getBestVideoAPI(dateRange);
          break;
        case 'engagement':
          this.getEngagementAPI(dateRange);
          break;
        case 'subscriber':
          this.getSubscriberAPI(dateRange);
          break;
        case 'traffic':
          this.getTrafficSourcesAPI(dateRange);
          break;
        case 'retention':
          this.getRetentionAPI(dateRange);
          break;
        case 'demographics':
          this.getDemographicsAPI(dateRange);
          break;
        case 'all':
          this.getPeriodAPI(dateRange);
          this.getBestVideoAPI(dateRange);
          this.getEngagementAPI(dateRange);
          this.getSubscriberAPI(dateRange);
          this.getTrafficSourcesAPI(dateRange);
          this.getRetentionAPI(dateRange);
          this.getDemographicsAPI(dateRange);
          break;
        default:
          console.warn(`Unhandled section: ${section}`);
      }
    }
  }

  getDateDaysAgo(days: number): { start: string, end: string } {
    const today = new Date(); // Create a new Date object for today
    const pastDate = new Date(); // Create a separate Date object for the past date
    pastDate.setDate(today.getDate() - days); // Modify only the pastDate object
    return {
      start: pastDate.toISOString().slice(0, 10), // Format as YYYY-MM-DD
      end: today.toISOString().slice(0, 10)      // Format as YYYY-MM-DD
    };
  }

  openVideo(url:string){
    window.open(url,'_blank');
  }

  formatNumber(value: number): string {
    if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (value >= 1_000) {
      return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    if(value){
      return value.toString();
    }else{
      return '0';
    }
    
  }

  showSpinner() {
    if (this.spinnerCount === 0) {
      this.spinner.show();
    }
    this.spinnerCount++;
  }

  hideSpinner() {
    this.spinnerCount--;
    if (this.spinnerCount <= 0) {
      this.spinnerCount = 0;
      this.spinner.hide();
    }
  }
  
  receiveRange(range: { start: string, end: string }) {
    if (this.rangeSection && range) {
      const dateRangeText = `${range.start} - ${range.end}`;
      
      switch (this.rangeSection) {
        case 'period':
          this.rangeDefaults.period = 'custom';
          this.getPeriodAPI(range);
          break;
        case 'best':
          this.rangeDefaults.best = 'custom';
          this.getBestVideoAPI(range);
          break;
        case 'engagement':
          this.rangeDefaults.engagement = 'custom';
          this.getEngagementAPI(range);
          break;
        case 'subscriber':
          this.rangeDefaults.subscriber = 'custom';
          this.getSubscriberAPI(range);
          break;
        case 'traffic':
          this.rangeDefaults.traffic = 'custom';
          this.getTrafficSourcesAPI(range);
          break;
        case 'retention':
          this.rangeDefaults.retention = 'custom';
          this.getRetentionAPI(range);
          break;
        case 'demographics':
          this.rangeDefaults.demographics = 'custom';
          this.getDemographicsAPI(range);
          break;
        case 'all':
          type RangeSection = 'period' | 'best' | 'engagement' | 'subscriber' | 'traffic' | 'retention' | 'demographics' | 'all';
          const sections: RangeSection[] = ['period', 'best', 'engagement', 'subscriber', 'traffic', 'retention', 'demographics', 'all'];
          for (const section of sections) {
            this.rangeDefaults[section] = 'custom';
          }
          this.getPeriodAPI(range);
          this.getBestVideoAPI(range);
          this.getEngagementAPI(range);
          this.getSubscriberAPI(range);
          this.getTrafficSourcesAPI(range);
          this.getRetentionAPI(range);
          this.getDemographicsAPI(range);
          break;
        default:
          console.warn(`Unhandled section: ${this.rangeSection}`);
      }
    }
    this.showDateRange = false;
  }

  refreshAPI(){
    this.getDashboardAPI();
  }

  getDashboardAPI() {
    this.showSpinner();
    this.dashboardService.getDashboardData().subscribe({next:(data) => {
      this.dashboardData = data;
      sessionStorage.setItem('overviewData', JSON.stringify(data));
      this.hideSpinner();
      },
      error:()=>{
        this.hideSpinner();
      }
    })
  }

  getPeriodAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getPeriodStats(dateRange).subscribe({
      next: (data) => {
        this.periodData = data;
        // this.rangeDefaults.period = `${dateRange.start} - ${dateRange.end}`;
        sessionStorage.setItem('periodData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getLatestVideoAPI(){
    this.showSpinner();
    this.dashboardService.getLatestVideoStats().subscribe({
      next:(data) => {
        this.latestVideoData=data;
        sessionStorage.setItem('latestVideoData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getBestVideoAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getBestVideo(dateRange).subscribe({
      next: (data) => {
        this.bestVideoData = data;
        sessionStorage.setItem('bestVideoData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getEngagementAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getEngagementStats(dateRange).subscribe({
      next: (data) => {
        this.engagementData = data;
        this.setEngagementCharts(data);
        sessionStorage.setItem('engagementData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getSubscriberAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getSubscriberStats(dateRange).subscribe({
      next: (data) => {
        this.setSubscriberCharts(data);
        sessionStorage.setItem('subscriberData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getTrafficSourcesAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getTrafficSources(dateRange).subscribe({
      next: (data) => {
        this.setTrafficSourcesCharts(data);
        sessionStorage.setItem('trafficSourcesData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getRetentionAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getRetentionStats(dateRange).subscribe({
      next: (data) => {
        this.retentionLineData = data?.line_data || {};
        this.setRetentionCharts(data);
        sessionStorage.setItem('retentionData', JSON.stringify(data));
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
  }

  getDemographicsAPI(dateRange: { start: string, end: string }) {
    this.showSpinner();
    this.dashboardService.getDemographics(dateRange).subscribe({
      next: (data) => {
        this.demographicsData = data;
        sessionStorage.setItem('demographicsData', JSON.stringify(data));
        this.setDemographicsCharts(data);
        this.setTreemapChart(data?.country || []);
        this.hideSpinner();
      },
      error: () => {
        this.hideSpinner();
      }
    });
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

  setTrafficSourcesCharts(data:any) {
    this.doubleBarData = {
      labels: data?.labels || [],
      datasets: [
        {
          label: 'Views',
          data: data?.views || [],
          backgroundColor: '#3b82f6', // blue
          borderColor: '#3b82f6',
          borderWidth: 1
        },
        {
          label: 'Watch Time',
          data: data?.watchTime || [],
          backgroundColor: '#10b981', // green
          borderColor: '#10b981',
          borderWidth: 1
        }
      ]
    };
  }

  setRetentionCharts(data:any) {
    this.retentionData=data;
    this.retentionLineData = {
      labels: data?.line_data.labels || [],
      datasets: [
        {
          label: 'Retention Percentage',
          data: data?.line_data.retentionPercentage || [],
          fill: false,
          borderColor: '#3b82f6',
          backgroundColor: '#3b82f6',
          tension: 0.3,
          pointRadius: 1,
          pointHoverRadius: 5
        }
      ]
    };
  }

  setDemographicsCharts(chartsData:any) {

    this.genderAgeBarData = chartsData.gender_age;

    this.devicePieData = chartsData.device || [];

  }

  setTreemapChart(treemapData: any) {
    const ctx = document.getElementById('treemapChart') as HTMLCanvasElement;
  
    if (this.countryChartData) {
      this.countryChartData.destroy();
    }
  
    this.countryChartData = new Chart(ctx, {
      type: 'treemap',
      data: {
        datasets: [
          {
            type: 'treemap',
            data: treemapData || [],
            borderColor: 'blue',
            borderWidth: 0.5,
            spacing: 0,
            backgroundColor: '#3b82f6',
            key: 'Views',
            groups: ['country'],
            labels: {
              display: true,
              color: 'white',
              font: {
                size: 12,
              },
              overflow: 'hidden'
            }
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }
}
