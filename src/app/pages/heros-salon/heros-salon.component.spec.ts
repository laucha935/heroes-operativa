import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerosSalonComponent } from './heros-salon.component';

describe('HerosSalonComponent', () => {
  let component: HerosSalonComponent;
  let fixture: ComponentFixture<HerosSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HerosSalonComponent]
    });
    fixture = TestBed.createComponent(HerosSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
