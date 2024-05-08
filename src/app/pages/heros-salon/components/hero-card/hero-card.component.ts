import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.scss'],
})
export class HeroCardComponent {
  @Input() hero: any;
  @Output() clickEvent = new EventEmitter<any>();

  onClickButton(hero: any, action?: string): void {
    if (action) {
      this.clickEvent.emit({
        action: action,
        heroInfo: hero,
      });
    } else {
      this.clickEvent.emit(hero);
    }
  }
}
