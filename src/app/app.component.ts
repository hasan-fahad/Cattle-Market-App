import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterOutlet} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './authenticate/auth.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Eid-ul-Adha Cattle Market';

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}