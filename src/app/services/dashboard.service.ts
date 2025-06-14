import { HttpClient, HttpParams } from "@angular/common/http";
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

    getPeriodStats(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.period, { params });
    }

    getLatestVideoStats(){
        return this.http.get<any>(this.latest);
    }
    
    getBestVideo(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.best, { params });
    }
    
    getEngagementStats(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.engagement, { params });
    }
    
    getSubscriberStats(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.subscriber, { params });
    }
    
    getTrafficSources(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.trafficSources, { params });
    }
    
    getRetentionStats(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.retention, { params });
    }
    
    getDemographics(range: { start: string, end: string }) {
        const params = new HttpParams()
            .set('start', range.start)
            .set('end', range.end);
        return this.http.get<any>(this.demographics, { params });
    }
}