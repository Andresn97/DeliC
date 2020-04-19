import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistroLocalPageRoutingModule } from './registro-local-routing.module';

import { RegistroLocalPage } from './registro-local.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroLocalPageRoutingModule
  ],
  declarations: [RegistroLocalPage]
})
export class RegistroLocalPageModule {}
