import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDataComponent } from './video-data/video-data.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';

@NgModule({
  declarations: [
    VideoListComponent,
    VideoDataComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideoListComponent,
      }
    ])
  ]
})
export class VideosModule { }
