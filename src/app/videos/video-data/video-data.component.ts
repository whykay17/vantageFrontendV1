import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { pieOptions } from '../../home/chartConfig';
import { Clipboard } from '@angular/cdk/clipboard';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-video-data',
  standalone: false,
  templateUrl: './video-data.component.html',
  styleUrl: './video-data.component.css'
})

export class VideoDataComponent {


  videoId!: string;
  overviewData:any;

  pieOptions = pieOptions;

  constructor(
    private route:Router,private activatedRoute: ActivatedRoute,private videoService:VideoService,
    private spinner:NgxSpinnerService,private clipboard:Clipboard,private message:MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.videoId = id;
      }
    });   
    this.getOverviewAPI(this.videoId);
  }

  getOverviewAPI(vid:string){
    this.spinner.show();
    this.videoService.getVideoOverview(vid).subscribe({
      next: (response:any) => {
        this.overviewData=response;
        this.spinner.hide();
      },
      error:(error) => {
        this.spinner.hide();
      }
    })
  }

  goBack(): void {
    this.route.navigate(['videos']);
    console.log('Navigating back to video list');
  }

  getStudioUrl(): string {
    return 'https://studio.youtube.com/video/'+this.videoId+'/edit';
  }

  openVideo(url:string){
    window.open(url,'_blank');
  }

  copyText(text: string) {
    this.clipboard.copy(text);
    this.message.add({ severity: 'contrast', summary: 'Info', detail: 'Copied to Clipboard', life: 3000 });
  }


}
