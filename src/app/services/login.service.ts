import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from "../models/usuario";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { Storage } from "@ionic/storage";
import * as firebase from "firebase";
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public logueado: any;
  private usuario: Usuario = null;

  constructor(
    private rutaFire: AngularFireAuth,
    private route: Router,
    private alertCtrl: AlertController,
    private strg: Storage,
    public fb : Facebook
  ) {
    rutaFire.authState.subscribe((user) => (this.logueado = user));
  }

  async Login(user: Usuario) {
    try {
      return await this.rutaFire.signInWithEmailAndPassword(
        user.correo,
        user.contrasena
      );
    } catch (err) {
      this.presentAlert();
      console.log("Error en el logueo: ", err);
    }
  }

  async Registro(user: Usuario) {
    try {
      return await this.rutaFire.createUserWithEmailAndPassword(
        user.correo,
        user.contrasena
      );
    } catch (error) {
      console.log("Ocurrió un error en el registro del usuario", error);
    }
  }

  async estaRegistrado(user: Usuario) {
    try {
      return await this.rutaFire.isSignInWithEmailLink(user.correo);
    } catch (error) {
      console.log("Ocurrió un error en la confirmación del corrreo: ", error);
    }
  }

  async retornarUsuario() {
    let user;
    user = await this.rutaFire.currentUser;
    // console.log(this.rutaFire.currentUser);

    if (user) {
      console.log("Usuario sigue logueado");

      return user;
    } else {
      return null;
    }
  }

  async logOut() {
    try {
      return await this.rutaFire.signOut();
    } catch (error) {
      console.log("Ocurrió un error en cerrar la sesión actual", error);
    }
  }

  cargarCorreo(correo: string) {
    this.usuario = new Usuario();
    this.strg.set("correo", this.usuario.correo);
  }

  async retornarCorreo(): Promise<Usuario> {
    this.usuario = new Usuario();
    this.usuario.correo = await this.strg.get("correo");
    return this.usuario;
  }

  eliminarCorreo(correo: string) {
    this.strg.remove("correo");
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: "Aviso",
      message: "No se pudo ingresar, revise los campos",
      buttons: [
        {
          text: "OK",
          handler: () => {
            console.log("Se seleccionó OK");
            this.route.navigate(["/"]);
          },
        },
        // {
        //   text: "No",
        //   handler: () => {
        //     console.log("Se seleccionó No");
        //   },
        // },
      ],
    });

    await alert.present();
  }

  login(){
      this.fb.login(['email'])
      .then((res: FacebookLoginResponse) => 
            //console.log('Logged into Facebook!', res)
            alert(JSON.stringify(res))
      )
    .catch(e => console.log('Error logging into Facebook', e));

  }

}
