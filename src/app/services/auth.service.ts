import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  backendURL=environment.apiUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  login() {
    window.location.href = this.backendURL+'login';
  }

  logout() {
    const logoutUrl= this.backendURL+'logout';
    this.http.get(logoutUrl, { withCredentials: true }).subscribe(() => {
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticatedSubject.next(false);
      sessionStorage.clear();
      window.location.reload();
    });
  }

  checkAuth() {
    const authURL=this.backendURL+'check-auth';
    this.http.get<{ authenticated: boolean }>(authURL).subscribe({
      next: (res) => {
        this.isAuthenticatedSubject.next(res.authenticated);
        if (res.authenticated) {
          localStorage.setItem('isAuthenticated', 'true');
        }
      },
      error: () => {
        this.isAuthenticatedSubject.next(false);
        localStorage.removeItem('isAuthenticated');
        sessionStorage.clear();
      }
    });
  }

  getStorage(itemName:string){
    return JSON.parse(sessionStorage.getItem(itemName)!);
  }

  setStorage(itemName: string, value: any){
    sessionStorage.setItem(itemName, JSON.stringify(value));
  }
  
}
