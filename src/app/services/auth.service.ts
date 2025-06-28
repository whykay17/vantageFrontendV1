import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  backendURL = environment.apiUrl;

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object) {
      this.checkAuth();
  }

  login() {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = this.backendURL + 'login';
    }
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      const logoutUrl = this.backendURL + 'logout';
      this.http.get(logoutUrl, { withCredentials: true }).subscribe(() => {
        sessionStorage.clear();
        this.isAuthenticatedSubject.next(false);
        this.router.navigate(['/']);
      });
    }
  }

  checkAuth() {
    const authURL = this.backendURL + 'check-auth';
    this.http.get<{ authenticated: boolean }>(authURL, { withCredentials: true })
      .subscribe({
        next: (res) => {
          this.isAuthenticatedSubject.next(res.authenticated);
        },
        error: () => {
          this.isAuthenticatedSubject.next(false);
          if (isPlatformBrowser(this.platformId)) {
            sessionStorage.clear();
          }
        }
      });
  }

  getStorage(itemName: string) {
    if (isPlatformBrowser(this.platformId)) {
      const value = sessionStorage.getItem(itemName);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }

  setStorage(itemName: string, value: any) {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(itemName, JSON.stringify(value));
    }
  }
}
