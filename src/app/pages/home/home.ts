import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {

  // Función para hacer scroll suave hacia la sección de servicios
  scrollAServicios() {
    const seccion = document.getElementById('servicios');
    if (seccion) {
      seccion.scrollIntoView({ behavior: 'smooth' });
    }
  }
}