/* =================================================
  Angular and rxjs imports
================================================= */
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
/* =================================================
  Services
================================================= */
import { HerosService } from './@shared/services/heros.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /* services */
  private herosApi: HerosService = inject(HerosService);
  /* ui */
  title = 'super-hero-app';
  subscription = new Subscription();

  /* =================================================
  Inits
================================================= */

  ngOnInit(): void {
    this.subscription.add(this.herosApi.getHeros().subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
