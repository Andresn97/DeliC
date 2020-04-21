import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxQRCodeModule } from "ngx-qrcode2";

import { IonicModule } from "@ionic/angular";

import { LocalPageRoutingModule } from "./local-routing.module";

import { LocalPage } from "./local.page";
import { ComponentsModule } from "src/app/components/components.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalPageRoutingModule,
    NgxQRCodeModule,
    ComponentsModule,
  ],
  declarations: [LocalPage],
})
export class LocalPageModule {}
