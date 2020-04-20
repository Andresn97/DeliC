import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-local",
  templateUrl: "./local.page.html",
  styleUrls: ["./local.page.scss"],
})
export class LocalPage implements OnInit {
  url = "http://localhost:8100/local/coral";
  tipo: "ulr" | "canvas" | "img" = "canvas";

  constructor(
    private barscanner: BarcodeScanner,
    private toastctllr: ToastController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let param = this.route.snapshot.params.nombreLocal;
    console.log(param);
  }
}
