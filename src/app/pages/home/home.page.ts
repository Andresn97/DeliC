import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { PersonaService } from "src/app/services/persona.service";
import { Persona } from "src/app/models/persona";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";
import * as firebase from "firebase";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook/ngx";
import { AngularFireAuth } from "@angular/fire/auth";
import { Platform } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();
  private personas: Observable<Persona[]>;
  private valores: Persona[];
  per: any;
  private withFacebook: boolean = false;

  constructor(
    private router: Router,
    private lgnSrv: LoginService,
    private prsnSrv: PersonaService,
    public fb: Facebook,
    private afAuth: AngularFireAuth,
    private platform: Platform
  ) {}

  ngOnInit(): void {
    this.personas = this.prsnSrv.getPersonaList();
    // this.corrreoLogeado = firebase.auth().currentUser.email;
    // console.log();
  }

  ionViewWillLeave() {
    if (this.withFacebook === false) {
      this.per.unsubscribe();
    }
  }

  // formulario.valid

  logeoUsuario() {
    const user = this.lgnSrv.Login(this.user).catch((err) => {
      console.log("No se pudo logear");
    });

    if (user !== null) {
      console.log("Usuario:", this.user.correo);
      console.log("Contraseña:", this.user.contrasena);
      this.lgnSrv.cargarCorreo(this.user.correo);
      //Validar el tipo de Persona
      this.recuperarTipo(this.user.correo);
    }
    this.user.correo = null;
    this.user.contrasena = null;
  }

  // entrarWithFace() {
  //   this.lgnFbSrv
  //     .login()
  //     .then((data) => {
  //       console.log(data);
  //       this.withFacebook = true;
  //       this.router.navigateByUrl("/registro/'facebook'");
  //     })
  //     .catch((err) => {
  //       console.log("Error en el logeo", err);
  //     });
  // }

  recuperarTipo(correo: string) {
    // this.corrreoLogeado
    //   .then((data: firebase.User) => {
    //     this.usuario = new Usuario();
    //     this.usuario.correo = data.email;
    //     // this.lgnSrv.cargarCorreo(this.usuario.correo);

    //     //Extracción de datos de Persona

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    this.per = this.personas.subscribe(
      (datos) => {
        this.valores = datos;

        this.valores.forEach((persona) => {
          if (persona.usuario.correo === correo) {
            if (persona.tipo == "Vendedor") {
              this.router.navigateByUrl("/local");
            } else {
              this.router.navigateByUrl("/inicio");
            }
            console.log("Esta es la persona:", persona);
          }
        });
      },
      (error) => {
        console.log("El usuario no se logeo correctamente");
      }
    );
  }

  login() {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        firebase
          .auth()
          .getRedirectResult()
          .then((result) => {
            console.log("Se logeo");

            alert(JSON.stringify(result));
            this.router.navigateByUrl("/inicio");
          })
          .catch(function (error) {
            alert(JSON.stringify(error));
          });
      });

    // this.fb.login(['email']).then((loginResponse)=> {

    //     let credential = firebase.auth.FacebookAuthProvider.credential(loginResponse.authResponse.accessToken)

    //     firebase.auth().signInWithCredential(credential).then((info) => {
    //       alert(JSON.stringify(info));
    //     })

    //   })
  }
}
