import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuth();
  }

  login() {
    window.location.href = 'http://localhost:5000/login';
  }

  logout() {
    this.http.get('http://localhost:5000/logout', { withCredentials: true }).subscribe(() => {
      localStorage.removeItem('isAuthenticated');
      this.isAuthenticatedSubject.next(false);
      sessionStorage.clear();
      window.location.reload();
    });
  }

  checkAuth() {
    this.http.get<{ authenticated: boolean }>('http://localhost:5000/check-auth').subscribe({
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
