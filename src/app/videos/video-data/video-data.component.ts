import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-data',
  standalone: false,
  templateUrl: './video-data.component.html',
  styleUrl: './video-data.component.css'
})
export class VideoDataComponent {

  videoId: string | null = null;

  constructor(private route:Router,private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.videoId = params.get('id');
    });
    console.log('Video ID:', this.videoId);
  }

  goBack(): void {
    this.route.navigate(['videos']);
    console.log('Navigating back to video list');
  }

}
