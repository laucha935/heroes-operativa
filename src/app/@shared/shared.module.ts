import { NgModule } from '@angular/core';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [],
})
export class SharedModule {}
