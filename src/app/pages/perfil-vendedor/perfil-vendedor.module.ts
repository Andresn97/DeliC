import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilVendedorPageRoutingModule } from './perfil-vendedor-routing.module';

import { PerfilVendedorPage } from './perfil-vendedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilVendedorPageRoutingModule
  ],
  declarations: [PerfilVendedorPage]
})
export class PerfilVendedorPageModule {}
