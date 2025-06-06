import { Component } from '@angular/core';

@Component({
  selector: 'app-video-list',
  standalone:false,
  templateUrl: './video-list.component.html',
  styleUrl: './video-list.component.css'
})

export class VideoListComponent {
  videos = [
    {
      id: '1',
      title: 'How to Build a Dashboard',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_1/hqdefault.jpg',
      publishedOn: '2024-12-01'
    },
    {
      id: '2',
      title: 'Understanding Watch Time',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_2/hqdefault.jpg',
      publishedOn: '2024-12-10'
    },
    {
      id: '3',
      title: 'Retention Analysis Explained',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_3/hqdefault.jpg',
      publishedOn: '2025-01-05'
    },  
    {
      id: '4',
      title: 'Engagement Metrics Overview',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_4/hqdefault.jpg',
      publishedOn: '2025-01-15'
    },
    {
      id: '5',
      title: 'Advanced Analytics Techniques',
      thumbnailUrl: 'https://img.youtube.com/vi/VIDEO_ID_5/hqdefault.jpg',
      publishedOn: '2025-02-01'
    }
  ];

  glassPaginatorDT = {
    surface: { glow: 'rgba(255,255,255,0.15)' },
    backdrop: { blur: '8px' },
    border: { radius: '12px' }
  };
  

  onVideoClick(videoId: string) {
    console.log(`Video clicked: ${videoId}`);
  }
}
