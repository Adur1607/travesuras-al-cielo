import { Component, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'travesuras-al-cielo';
  isScrolled = false;
  isHomePage = true; // Variable para saber si estamos en el inicio

  constructor(private router: Router) {
    // Escuchamos cada vez que el usuario cambia de página
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Verificamos si la ruta actual es el home
        this.isHomePage = (event.url === '/home' || event.url === '/');
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}