import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cattle } from '../models/cattle.model';

@Injectable({
  providedIn: 'root',
})
export class CattleService {
  private apiUrl = 'https://cattle-backend.onrender.com/cattle';

  constructor(private http: HttpClient) {}

  getAllCattle(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(this.apiUrl);
  }

  getCattleById(id: number): Observable<Cattle> {
    return this.http.get<Cattle>(`${this.apiUrl}/${id}`);
  }

  addCattle(cattle: Omit<Cattle, 'id'>): Observable<Cattle> {
    return this.http.post<Cattle>(this.apiUrl, cattle);
  }

  updateCattle(id: number, cattle: Partial<Cattle>): Observable<Cattle> {
    return this.http.patch<Cattle>(`${this.apiUrl}/${id}`, cattle);
  }

  deleteCattle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
