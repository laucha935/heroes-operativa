import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [CommonModule, MatButtonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [],
})
export class SharedModule {}
