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
import * as firebase from "firebase";
import { LoginFacebookService } from "src/app/services/login-facebook.service";
import { OpinionUsuarioPage } from "../opinion-usuario/opinion-usuario.page";
import { Opinion } from "src/app/models/opinion";
import { OpinionService } from "src/app/services/opinion.service";

@Component({
  selector: "app-local",
  templateUrl: "./local.page.html",
  styleUrls: ["./local.page.scss"],
})
export class LocalPage implements OnInit {
  url = "http://localhost:8100/local/";
  tipo: "ulr" | "canvas" | "img" = "canvas";
  private data: Observable<Local[]>;
  // private platos: Observable<Plato[]>;
  private local: Local;
  private platos: Plato[];
  private plato: Plato;
  private corrreoLogeado: any;
  private suscribe: any;
  private suscribe2: any;
  private opinion: Opinion;

  constructor(
    // private barscanner: BarcodeScanner,
    private route: ActivatedRoute,
    private modalCtr: ModalController,
    private router: Router,
    private lclSrvc: LocalService,
    private pltSrv: PlatoService,
    private lgnFbSrv: LoginFacebookService,
    private lgnSrv: LoginService,
    private pnSrv: OpinionService
  ) {
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
  }

  ngOnInit() {
    this.local = new Local();
    // this.corrreoLogeado = firebase.auth().currentUser;
    // let correo;
    // this.lgnSrv.retornarCorreo().then((data) => {
    //   correo = data;
    // });
    let param = this.route.snapshot.params.nombreLocal;
    if (param) {
      this.url += param;

      this.suscribe = this.data.subscribe((locales) => {
        this.local = new Local();
        this.lgnSrv.retornarCorreo().then((data) => {
          console.log(data);
          locales.forEach((local) => {
            console.log(local);

            local.usuario.forEach((usuario) => {
              if (usuario.correo === data.toString()) {
                this.local = local;
                console.log(this.local);
                this.platos = [];
                this.extraerPlatos();
              }
            });
          });
        });
      });
    } else {
      console.log("else");

      this.suscribe = this.data.subscribe((locales) => {
        this.local = new Local();
        this.lgnSrv.retornarCorreo().then((data) => {
          // this.corrreoLogeado = data;

          locales.forEach((local) => {
            console.log(local);

            local.usuario.forEach((usuario) => {
              if (usuario.correo === data.toString()) {
                this.local = local;
                console.log(this.local);
                this.router.navigateByUrl(`/local/${this.local.nombre}`);
              }
            });
          });
        });
      });
    }
  }

  extraerPlatos() {
    console.log("entro en plato");

    this.pltSrv.getPlatoList().subscribe((data) => {
      data.forEach((plato) => {
        console.log(plato);

        if (plato.local.nombre === this.local.nombre) {
          this.platos.push(plato);
          console.log(this.platos);
        }
      });
    });
  }

  ionViewDidEnter() {}

  async mostrarRegistro() {
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

  async mostrarOpinion(plato: string) {
    const modal = await this.modalCtr.create({
      component: OpinionUsuarioPage,
      componentProps: {
        preguntas: null,
        plato: plato,
        cancela: null,
      },
    });

    await modal.present();

    await modal.onDidDismiss().then((opinion) => {
      // if (opinion.data.cancela === false) {
      let usuario: Usuario = new Usuario();
      this.lgnSrv.retornarCorreo().then((data) => {
        usuario.correo = data.toString();
        console.log(usuario.correo);
      });
      let plato: Plato = new Plato();
      this.opinion = new Opinion();

      // usuario.correo = this.corrreoLogeado;
      this.opinion.usuario = usuario;
      this.opinion.preguntas = opinion.data.preguntas;
      plato.nombre = opinion.data.plato;
      this.opinion.activo = true;
      this.opinion.plato = plato;
      this.pnSrv.crearOpinion(this.opinion);
      console.log(this.opinion);
      console.log(opinion.data);
      // }
      // this.lgnSrv.retornarCorreo().then()
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
      this.plato.local = this.local;
      console.log(this.plato);

      this.pltSrv.crearPlato(this.plato);
      // this.extraerPlatos();
    } else {
      console.log("No se encontraron los datos");
    }
  }

  ionViewWillLeave() {}

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.lgnSrv.eliminarCorreo();
  }
}
