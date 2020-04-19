import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { PersonaService } from "src/app/services/persona.service";
import { Persona } from "src/app/models/persona";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();
  private persona: any;

  constructor(
    private router: Router,
    private lgnSrv: LoginService,
    private prsnSrv: PersonaService
  ) {}

  // formulario.valid

  logeoUsuario() {
    const user = this.lgnSrv.Login(this.user);
    if (user) {
      console.log("Logeo con éxito");
      console.log("Usuario:", this.user.correo);
      console.log("Contraseña:", this.user.contrasena);
      //Validar el tipo de Persona
      this.persona = this.prsnSrv.getPersona(this.user.correo);
      console.log(this.persona);

      this.router.navigateByUrl("/inicio");
    } else {
      console.log("El logeo no se pudo realizar");
    }
    this.user.correo = null;
    this.user.contrasena = null;
  }
}
