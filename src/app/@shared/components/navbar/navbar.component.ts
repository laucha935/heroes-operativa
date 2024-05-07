import { Component, inject } from '@angular/core';
import { HerosService } from '../../services/heros.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  private heroService = inject(HerosService);

  addHero(): void {
    this.heroService.addHeroInList();
  }
}
