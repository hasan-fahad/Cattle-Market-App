import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'https://cattle-backend.onrender.com';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, { username, password });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, {});
  }

  getCattle(): Observable<any> {
    return this.http.get(`${this.baseUrl}/cattle`);
  }

  addCattle(cattle: { name: string; available: boolean }): Observable<any> {
    return this.http.post(`${this.baseUrl}/cattle`, cattle);
  }

  updateCattleAvailability(id: number, available: boolean): Observable<any> {
    return this.http.patch(`${this.baseUrl}/cattle/${id}`, { available });
  }
}
