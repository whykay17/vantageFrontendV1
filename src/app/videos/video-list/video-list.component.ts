import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { IVideo } from '../../../models/video.model';

@Component({
  selector: 'app-video-list',
  standalone:false,
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})

export class VideoListComponent {

  constructor(private videoService: VideoService,private spinner:NgxSpinnerService) {}

  ngOnInit(): void {
    var storedVideoList = sessionStorage.getItem('videoList');
    if (storedVideoList) {
      this.allVideos = JSON.parse(storedVideoList);
      this.updatePagedVideos();
    }else{
      this.getVideoListAPI();
    }
  }

  allVideos: IVideo[] = [];
  pagedVideos: IVideo[] = [];

  currentPage: number = 0;
  rows: number = 9;
  searchTerm: string = '';

  getVideoListAPI(){
    this.spinner.show();
    this.videoService.getVideoList().subscribe({
      next: (response:IVideo[]) => {
        this.allVideos = response;
        this.updatePagedVideos();
        sessionStorage.setItem('videoList', JSON.stringify(this.allVideos));
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
      }
    })
  }

  pageChange(event: any) {
    this.currentPage = event.page;
    this.rows = event.rows;
    this.updatePagedVideos();
  }

  updatePagedVideos(videos?:IVideo[]) {
    const arrayToPaginate = videos || this.getFilteredVideos();
    const start = this.currentPage * this.rows;
    const end = start + this.rows;
    this.pagedVideos = arrayToPaginate.slice(start, end);
  }

  getFilteredVideos(): IVideo[] {
    const term = this.searchTerm.toLowerCase().trim();
    if (!term) return this.allVideos;
    return this.allVideos.filter((video: IVideo) =>
      video.title.toLowerCase().includes(term)
    );
  }

  applySearch(): void {
    const term = this.searchTerm.toLowerCase().trim();
    const filtered = this.allVideos.filter((video: IVideo) =>
      video.title.toLowerCase().includes(term)
    );
    this.currentPage = 0;
    this.updatePagedVideos(filtered);
  }

  onVideoClick(videoId: string) {
    console.log(`Video clicked: ${videoId}`);
  }
}
