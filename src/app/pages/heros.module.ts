import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HerosSalonComponent } from './heros-salon/heros-salon.component';
import { HerosRoutingModule } from './heros-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { HeroFormComponent } from './heros-salon/components/hero-form/hero-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ConfirmDeleteComponent } from './heros-salon/components/confirm-delete/confirm-delete.component';
import { HeroCardComponent } from './heros-salon/components/hero-card/hero-card.component';

@NgModule({
  imports: [
    CommonModule,
    HerosRoutingModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  declarations: [
    HerosSalonComponent,
    HeroFormComponent,
    ConfirmDeleteComponent,
    HeroCardComponent,
  ],
})
export class HerosModule {}
