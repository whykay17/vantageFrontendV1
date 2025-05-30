import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })



export class DashboardService {

    backendURL = 'http://localhost:5000/'
    private overview = this.backendURL+'channel-overview';
    private period = this.backendURL+'period-stats?';
    private latest = this.backendURL+'latest-video';
    private best = this.backendURL+'best-video?';
    private engagement = this.backendURL+'engagement?';
    private subscriber = this.backendURL+'subscriber?';

    constructor(private http:HttpClient){}

    getDashboardData() {
        return this.http.get<any>(this.overview);
    }

    getPeriodStats(range:number){
        return this.http.get<any>(this.period+'period='+range);
    }

    getLatestVideoStats(){
        return this.http.get<any>(this.latest);
    }

    getBestVideo(range:number){
        return this.http.get<any>(this.best+'period='+range);
    }

    getEngagementStats(range:number){
        return this.http.get<any>(this.engagement+'period='+range);
    }

    getSubscriberStats(range:number){
        return this.http.get<any>(this.subscriber+'period='+range);
    }
}