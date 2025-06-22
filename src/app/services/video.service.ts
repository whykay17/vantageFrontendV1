import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
  })

  export class VideoService {
    backendURL = environment.apiUrl;
    rootUrl = 'video/'
    private videoList = this.backendURL+this.rootUrl+'list';
    private videoOverview = this.backendURL+this.rootUrl+'overview?';

    constructor(private http:HttpClient){}

    getVideoList() {
        return this.http.get<any>(this.videoList);
    }

    getVideoOverview(videoId:string) {
      return this.http.get<any>(this.videoOverview+'vid='+videoId);
    }
  }