import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Usuario } from "../models/usuario";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public logueado: any;
  constructor(private rutaFire: AngularFireAuth) {
    rutaFire.authState.subscribe((user) => (this.logueado = user));
  }

  async Login(user: Usuario) {
    try {
      return await this.rutaFire.signInWithEmailAndPassword(
        user.correo,
        user.contrasena
      );
    } catch (err) {
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

  retornarUsuario() {
    let user;
    user = this.rutaFire.currentUser;

    if (user) {
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
}
