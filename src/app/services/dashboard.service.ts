import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })



export class DashboardService {

    backendURL = 'http://localhost:5000/'
    private overview = this.backendURL+'channel-overview';
    private period = this.backendURL+'period-stats?'

    constructor(private http:HttpClient){}

    getDashboardData() {
        return this.http.get<any>(this.overview);
    }

    getPeriodStats(range:number){
        return this.http.get<any>(this.period+'period='+range);
    }

}