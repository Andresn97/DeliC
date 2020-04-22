import { Component, OnInit } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { ToastController, ModalController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { Local } from "src/app/models/local";
import { Observable } from "rxjs";
import { LocalService } from "src/app/services/local.service";
import { LoginService } from "src/app/services/login.service";
import { Usuario } from "src/app/models/usuario";
import { PlatoPage } from "../plato/plato.page";
import { NgModel } from "@angular/forms";
import { PlatoService } from "src/app/services/plato.service";
import { Plato } from "src/app/models/plato";

@Component({
  selector: "app-local",
  templateUrl: "./local.page.html",
  styleUrls: ["./local.page.scss"],
})
export class LocalPage implements OnInit {
  url = "http://localhost:8100/local/";
  tipo: "ulr" | "canvas" | "img" = "canvas";
  private data: Observable<Local[]>;
  private platos: Observable<Plato[]>;
  private local: Local = null;
  private plato: Plato;
  private suscribe: any;
  private suscribe2: any;

  constructor(
    // private barscanner: BarcodeScanner,
    private route: ActivatedRoute,
    private modalCtr: ModalController,
    private router: Router,
    private lclSrvc: LocalService,
    private pltSrv: PlatoService,
    private lgnSrv: LoginService // private usuario: Usuario
  ) {
    this.platos = this.pltSrv.getPlatoList();
    this.data = this.lclSrvc.getLocalList();
    // this.suscribe = this.data.subscribe((locales) => {
    //   //Se extrae el correo del logeado

    //   this.suscribe2 = this.lgnSrv.retornarCorreo().then((data) => {
    //     this.usuario = new Usuario();
    //     this.usuario.correo = data.correo;
    //     console.log("Desde local, correo:", this.usuario.correo);

    //     locales.forEach((data) => {
    //       data.usuario.forEach((user) => {
    //         if (user.correo === this.usuario.correo) {
    //           this.router.navigateByUrl(
    //             `http://localhost:8100/local/${data.nombre}`
    //           );
    //           this.local = data;
    //         } else {
    //           this.router.navigateByUrl("/registro-local");
    //         }
    //       });
    //     });
    //   });

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
    // });
  }

  ngOnInit() {
    let param = this.route.snapshot.params.nombreLocal;
    this.url += param;
  }

  async presentModal() {
    const modal = await this.modalCtr.create({
      component: PlatoPage,
      componentProps: {
        nombre: null,
        precio: null,
        ingredientes: null,
        descripcion: null,
        esValido: false,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then((plato) => {
      this.guardarPlato(plato.data);
    });
  }

  guardarPlato(plato: any) {
    if (plato.esValido === true) {
      this.plato = new Plato();
      this.plato.nombre = plato.nombre;
      this.plato.descripcion = plato.descripcion;
      this.plato.ingredientes = plato.ingredientes;
      this.plato.precio = plato.precio;
      this.plato.activo = true;
      console.log(this.plato);

      this.pltSrv.crearPlato(this.plato);
    } else {
      console.log("No se encontraron los datos");
    }
  }

  ionViewWillLeave() {
    // this.suscribe.unsubscribe();
    // this.suscribe2.unsubscribe();
  }
}
