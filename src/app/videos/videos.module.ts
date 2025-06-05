import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDataComponent } from './video-data/video-data.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    VideoListComponent,
    VideoDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideoListComponent,
      }
    ])
  ]
})
export class VideosModule { }
