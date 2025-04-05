import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class DashboardService {

    private apiUrl = 'http://localhost:5000/youtube-data';

    constructor(private http:HttpClient){}

    getYouTubeData() {
        return this.http.get<any>(this.apiUrl);
    }

}