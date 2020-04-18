import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();

  constructor(private router: Router, private lgn: LoginService) {}

  // formulario.valid

  logeoUsuario() {
    const user = this.lgn.Login(this.user);
    if (user) {
      console.log("Logeo con éxito");
      this.router.navigateByUrl("/inicio");
    } else {
      console.log("El logeo no se pudo realizar");
    }
    console.log("Usuario:", this.user.correo);
    console.log("Contraseña:", this.user.contrasena);
  }
}
