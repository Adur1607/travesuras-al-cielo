
import { Component, HostListener, OnDestroy } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  Router,
  NavigationEnd
} from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {
  title = 'travesuras-al-cielo';
  isScrolled = false;
  isHomePage = true;
  isMenuOpen = false;

  private routerSubscription: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isHomePage =
            event.urlAfterRedirects === '/home' ||
            event.urlAfterRedirects === '/';

          this.isMenuOpen = false;
        }
      });
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize')
  onWindowResize(): void {
    if (window.innerWidth > 768) {
      this.isMenuOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
