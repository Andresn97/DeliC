import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilVendedorPage } from './perfil-vendedor.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilVendedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilVendedorPageRoutingModule {}
