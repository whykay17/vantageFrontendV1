import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class DashboardService {

    backendURL = 'http://localhost:5000/'
    rootUrl = 'channel/'
    private overview = this.backendURL+this.rootUrl+'overview';
    private period = this.backendURL+this.rootUrl+'period-stats?';
    private latest = this.backendURL+this.rootUrl+'latest-video';
    private best = this.backendURL+this.rootUrl+'best-video?';
    private engagement = this.backendURL+this.rootUrl+'engagement?';
    private subscriber = this.backendURL+this.rootUrl+'subscriber?';
    private trafficSources = this.backendURL+this.rootUrl+'traffic?';
    private retention = this.backendURL+this.rootUrl+'retention?';
    private demographics = this.backendURL+this.rootUrl+'demographics?';

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

    getTrafficSources(range:number){
        return this.http.get<any>(this.trafficSources+'period='+range);
    }

    getRetentionStats(range:number){
        return this.http.get<any>(this.retention+'period='+range);
    }

    getDemographics(range:number){
        return this.http.get<any>(this.demographics+'period='+range);
    }
}