import { Component } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  youtubeData:any;

  constructor(private dashboardService:DashboardService){}

  ngOnInit(): void {
    this.getYoutubeAPI();
  }

  getYoutubeAPI(){
    this.dashboardService.getYouTubeData().subscribe(data => {
      this.youtubeData=data;
    }
  )
}
}
