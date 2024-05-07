import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, map } from 'rxjs';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class HerosService {
  API_KEY = 'ee3eabe84d3c66fd108cfd36045f9da7';
  private heros = signal<any>({});
  heros$ = toObservable(this.heros);
  constructor(private http: HttpClient) {}

  getHeros() {
    let url = `https://gateway.marvel.com:443/v1/public/characters`;
    const queryparam = {
      apikey: this.API_KEY,
      limit: 30,
    };
    return this.http
      .get(url, { params: queryparam })
      .subscribe((data: any) => this.heros.set(data.data.results));
  }
}
