import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Local } from "src/app/models/local";
import { Observable } from "rxjs";
import { LocalService } from "src/app/services/local.service";
import { LoginService } from "src/app/services/login.service";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: "app-local",
  templateUrl: "./local.page.html",
  styleUrls: ["./local.page.scss"],
})
export class LocalPage implements OnInit {
  url = "http://localhost:8100/local/";
  tipo: "ulr" | "canvas" | "img" = "canvas";
  private data: Observable<Local[]>;
  private local: Local = null;
  private suscribe: any;
  private suscribe2: any;

  constructor(
    // private barscanner: BarcodeScanner,
    private toastctllr: ToastController,
    private route: ActivatedRoute,
    private router: Router,
    private lclSrvc: LocalService,
    private lgnSrv: LoginService,
    private usuario: Usuario
  ) {
    this.data = this.lclSrvc.getLocalList();
    this.suscribe = this.data.subscribe((locales) => {
      //Se extrae el correo del logeado

      this.suscribe2 = this.lgnSrv.retornarCorreo().then((data) => {
        this.usuario = new Usuario();
        this.usuario.correo = data.correo;
        console.log("Desde local, correo:", this.usuario.correo);

        locales.forEach((data) => {
          data.usuario.forEach((user) => {
            if (user.correo === this.usuario.correo) {
              this.router.navigateByUrl(
                `http://localhost:8100/local/${data.nombre}`
              );
              this.local = data;
            } else {
              this.router.navigateByUrl("/registro-local");
            }
          });
        });
      });

      // this.lgnSrv.retornarUsuario().then((data) => {
      //   this.usuario = new Usuario();
      //   this.usuario.correo = data.email;

      //   locales.forEach((data) => {
      //     data.usuario.forEach((user) => {
      //       if (user.correo === this.usuario.correo) {
      //         this.router.navigateByUrl(
      //           `http://localhost:8100/local/${data.nombre}`
      //         );
      //         this.local = data;
      //       } else {
      //         this.router.navigateByUrl("/registro-local");
      //       }
      //     });
      //   });
      // });
    });
  }

  ngOnInit() {
    let param = this.route.snapshot.params.nombreLocal;
    this.url += param;
  }

  ionViewWillLeave() {
    this.suscribe.unsubscribe();
    this.suscribe2.unsubscribe();
  }
}
