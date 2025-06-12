import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoDataComponent } from './video-data/video-data.component';
import { RouterModule } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { FormsModule } from '@angular/forms';
import { ChartModule } from 'primeng/chart';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    VideoListComponent,
    VideoDataComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule,
    NgxSpinnerModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    ChartModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VideoListComponent
      },
      {
        path:':id',
        component: VideoDataComponent
      }
    ])
  ]
})
export class VideosModule { }
