import { Component, OnInit, inject } from '@angular/core';
import { HerosService } from './@shared/services/heros.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'super-hero-app';

  private herosApi: HerosService = inject(HerosService);

  ngOnInit(): void {
    this.herosApi.getHeros();
  }
}
