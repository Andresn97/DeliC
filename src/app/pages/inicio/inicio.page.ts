import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { HistorialQRService } from "src/app/services/historial-qr.service";
import { HistorialQR } from "src/app/models/historial-qr";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  enlace: HistorialQR;
  constructor(
    private lgn: LoginService,
    private router: Router,
    private barcode: BarcodeScanner,
    private hQR: HistorialQRService
  ) {}

  ngOnInit() {
    this.barcode
      .scan()
      .then((barcodeData) => {
        if (!barcodeData.cancelled) {
          this.enlace = new HistorialQR(barcodeData.format, barcodeData.text);
          this.hQR.crearHistorialQR(this.enlace);
          // this.hQR.guardarHistorialQR(barcodeData.format, barcodeData.text);
        }
        console.log("Barcode data", barcodeData);
      })
      .catch((err) => {
        console.log("Error", err);
        // this.hQR.guardarHistorialQR("QRCode", "https://google.com");
        console.log();
      });
  }
}
