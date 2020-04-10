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
      return await this.rutaFire.
    } catch (err) {
      console.log("Error en el logueo: ", err);
    }
  }
}
