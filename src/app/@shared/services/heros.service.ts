import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  private http: HttpClient = inject(HttpClient);
  API_KEY = 'ee3eabe84d3c66fd108cfd36045f9da7';
  private heros = signal<any>({});
  heros$ = toObservable(this.heros);

  private addHero = signal<boolean>(false);
  addHero$ = toObservable(this.addHero);

  getHeros(): Observable<any> {
    let url = `https://gateway.marvel.com:443/v1/public/characters`;
    const queryparam = {
      apikey: this.API_KEY,
      limit: 30,
    };
    return this.http
      .get(url, { params: queryparam })
      .pipe(map((data: any) => this.heros.set(data.data.results)));
  }

  addHeroInList(): void {
    console.log('add hero un service');
    this.addHero.set(true);
    setTimeout(() => {
      this.addHero.set(false);
    }, 500);
  }
}
