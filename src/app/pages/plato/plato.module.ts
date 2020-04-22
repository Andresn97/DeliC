import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatoPageRoutingModule } from './plato-routing.module';

import { PlatoPage } from './plato.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatoPageRoutingModule
  ],
  declarations: [PlatoPage]
})
export class PlatoPageModule {}
