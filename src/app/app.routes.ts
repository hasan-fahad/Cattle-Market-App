import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { CattleListComponent } from './components/cattle-list/cattle-list.component';
import { AddCattleComponent } from './components/cattle-form/cattle-form.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CattleListComponent, canActivate: [authGuard] },
  { path: 'add', component: AddCattleComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: AddCattleComponent, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }
];