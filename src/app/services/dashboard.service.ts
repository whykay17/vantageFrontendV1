import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class DashboardService {

    private overview = 'http://localhost:5000/channel-overview';

    constructor(private http:HttpClient){}

    getDashboardData() {
        return this.http.get<any>(this.overview);
    }

}