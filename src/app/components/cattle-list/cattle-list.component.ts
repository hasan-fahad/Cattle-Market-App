import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cattle } from '../../models/cattle.model';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cattle-list',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cattle-list.component.html',
  styleUrls: ['./cattle-list.component.scss'],
})
export class CattleListComponent implements OnInit {
  cattleList: Cattle[] = [];
  loading = true;

  private apiUrl = 'https://cattle-backend.onrender.com/cattle';

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit(): void {
    this.getCattleList().subscribe({
      next: (data) => {
        this.cattleList = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching cattle list:', err);
        this.loading = false;
      },
    });
  }

  getCattleList(): Observable<Cattle[]> {
    return this.http.get<Cattle[]>(this.apiUrl);
  }

  toggleAvailability(cattle: Cattle) {
    const newStatus = !cattle.available;
    this.http
      .patch<Cattle>(`${this.apiUrl}/${cattle.id}`, { available: newStatus })
      .subscribe(
        (updated) => {
          cattle.available = updated.available;
        },
        (err) => {
          alert('Failed to update availability');
        }
      );
  }

  formatImagePath(path: string): string {
    if (!path) return 'assets/images/cow.jpg';
    if (path.startsWith('http')) return path;
    return path.startsWith('/') ? path.substring(1) : path;
  }
  openAddCattleForm() {
    this.route.navigate(['/add']);
  }

  editCattle(cattle: any) {
    this.route.navigate(['/edit', cattle.id]);
  }
}
