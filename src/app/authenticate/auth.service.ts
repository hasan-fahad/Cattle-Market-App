import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'https://cattle-backend.onrender.com';
  private currentUserSubject = new BehaviorSubject<any>(this.getStoredUser());
  public currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        tap((res: any) => {
          localStorage.setItem('user', JSON.stringify(res));
          this.currentUserSubject.next(res);
        })
      );
  }

  logout(): Observable<any> {
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  get currentUserValue(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  private getStoredUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  get token(): string | null {
    const user = this.currentUserValue;
    return user?.token || null;
  }
}
