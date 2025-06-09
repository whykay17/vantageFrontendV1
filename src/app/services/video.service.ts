import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

  export class VideoService {
    backendURL = 'http://localhost:5000/'
    private videoList = this.backendURL+'video-list?';
    private videoData = this.backendURL+'video-data?';

    constructor(private http:HttpClient){}

    getVideoList() {
        return this.http.get<any>(this.videoList);
    }
  }