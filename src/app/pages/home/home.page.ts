import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();

  constructor() {}

  // formulario.valid

  logeoUsuario() {
    console.log("Usuario:", this.user.correo);
    console.log("Contraseña:", this.user.contrasena);
  }
}
