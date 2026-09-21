import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro';
import { LoginComponent } from './pages/login/login';
import { SolicitudComponent } from './pages/solicitud/solicitud';
import { RastreadorComponent } from './pages/rastreador/rastreador';
import { CoberturaComponent } from './pages/cobertura/cobertura';
import { Home } from './pages/home/home'; // <-- Importamos el Home

export const routes: Routes = [
  { path: 'home', component: Home }, // <-- Ruta del Home
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'solicitud', component: SolicitudComponent },
  { path: 'rastreador', component: RastreadorComponent },
  { path: 'cobertura', component: CoberturaComponent },
  
  // Redirigimos a 'home' cuando la URL esté vacía
  { path: '', redirectTo: '/home', pathMatch: 'full' } 
];