import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro';
import { LoginComponent } from './pages/login/login';

export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  
  // es por si la ruta esta vacia redirije al login por defecto
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];