import { Component } from '@angular/core';
import { YoutubeDataService } from '../services/youtubeData.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  youtubeData:any;

  constructor(private youtubeDataService: YoutubeDataService){}

  ngOnInit(): void {
    this.getYoutubeAPI();
  }

  getYoutubeAPI(){
    this.youtubeDataService.getYouTubeData().subscribe(data => {
      this.youtubeData=data;
      console.log(this.youtubeData);
    }
  )
}
}
