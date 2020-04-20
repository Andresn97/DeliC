import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgxQRCodeModule } from "ngx-qrcode2";

import { IonicModule } from "@ionic/angular";

import { LocalPageRoutingModule } from "./local-routing.module";

import { LocalPage } from "./local.page";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocalPageRoutingModule,
    NgxQRCodeModule,
  ],
  declarations: [LocalPage],
})
export class LocalPageModule {}
