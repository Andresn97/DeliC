import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { HistorialQRService } from "src/app/services/historial-qr.service";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
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
          this.hQR.guardarHistorialQR(barcodeData.format, barcodeData.text);
        }
        console.log("Barcode data", barcodeData);
      })
      .catch((err) => {
        console.log("Error", err);
       // this.hQR.guardarHistorialQR("QRCode", "https://google.com");
        console.log();
      });
  }

  // salir() {
  //   const logOut = this.lgn.logOut();
  //   if (logOut) {
  //     console.log("Usuario salió exitosamente");
  //     this.router.navigateByUrl("/");
  //   } else {
  //     console.log("Ocurrió un error en cerrar la Sesión");
  //   }
  // }
}
