import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

import { HerosSalonComponent } from './heros-salon/heros-salon.component';

const routes: Routes = [
  {
    path: '',
    component: HerosSalonComponent,
  },
  // {
  //   path: 'read-notice',
  //   component: NoticeReadComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HerosRoutingModule {}
