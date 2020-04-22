import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxQRCodeModule } from "ngx-qrcode2";

import { IonicModule } from "@ionic/angular";

import { LocalPageRoutingModule } from "./local-routing.module";

import { LocalPage } from "./local.page";
import { ComponentsModule } from "src/app/components/components.module";
import { PlatoPage } from "../plato/plato.page";
import { PlatoPageModule } from "../plato/plato.module";

@NgModule({
  entryComponents: [PlatoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalPageRoutingModule,
    NgxQRCodeModule,
    ComponentsModule,
    PlatoPageModule,
  ],
  declarations: [LocalPage],
})
export class LocalPageModule {}
