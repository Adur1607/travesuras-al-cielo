import { Routes } from '@angular/router';
import { RegistroComponent } from './pages/registro/registro';
import { LoginComponent } from './pages/login/login';
import { SolicitudComponent } from './pages/solicitud/solicitud';
import { RastreadorComponent } from './pages/rastreador/rastreador'; // <-- Importar
import { CoberturaComponent } from './pages/cobertura/cobertura';
export const routes: Routes = [
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'solicitud', component: SolicitudComponent },
  { path: 'rastreador', component: RastreadorComponent }, // <-- Agregar ruta
  { path: 'cobertura', component: CoberturaComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];