import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistroLocalPage } from './registro-local.page';

const routes: Routes = [
  {
    path: '',
    component: RegistroLocalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistroLocalPageRoutingModule {}
