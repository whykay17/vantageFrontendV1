import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class YoutubeDataService {

    private apiUrl = 'http://127.0.0.1:5000/youtube-data';

    constructor(private http:HttpClient){}

    getYouTubeData() {
        return this.http.get(this.apiUrl);
      }

}