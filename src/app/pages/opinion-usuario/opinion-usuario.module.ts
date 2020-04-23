import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OpinionUsuarioPageRoutingModule } from './opinion-usuario-routing.module';

import { OpinionUsuarioPage } from './opinion-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OpinionUsuarioPageRoutingModule
  ],
  declarations: [OpinionUsuarioPage]
})
export class OpinionUsuarioPageModule {}
