/* =================================================
  Angular and rxjs imports
================================================= */
import { Component, inject } from '@angular/core';

/* =================================================
  Services
================================================= */
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  /* Services */
  private heroService = inject(HerosService);

  /* =================================================
  Methods
================================================= */

  addHero(): void {
    this.heroService.addHeroInList();
  }
}
