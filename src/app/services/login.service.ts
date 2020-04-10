import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public logueado: any;
  constructor(private rutaFire: AngularFireAuth) {
    rutaFire.authState.subscribe((user) => (this.logueado = user));
  }

  async Login(user) {
    try {
      return await this.rutaFire.signInWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (err) {
      console.log("Error en el logueo: ", err);
    }
  }

  async Registro(user) {
    try {
      return await this.rutaFire.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    } catch (error) {
      console.log("Ocurrió un error en el registro del usuario", error);
    }
  }
}
