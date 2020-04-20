import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { PersonaService } from "src/app/services/persona.service";
import { Persona } from "src/app/models/persona";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();
  private personas: Observable<Persona[]>;
  private persona: Persona;

  constructor(
    private router: Router,
    private lgnSrv: LoginService,
    private prsnSrv: PersonaService
  ) {}

  ngOnInit(): void {
    this.personas = this.prsnSrv.getPersonaList();
  }

  // formulario.valid

  logeoUsuario() {
    const user = this.lgnSrv.Login(this.user);
    if (user) {
      console.log("Logeo con éxito");
      console.log("Usuario:", this.user.correo);
      console.log("Contraseña:", this.user.contrasena);
      //Validar el tipo de Persona
      // this.persona = this.prsnSrv.getPersona(this.user.correo);
      // this.persona.subscribe((data) => {
      //   console.log(data);
      // });
      this.recuperarTipo();
      // console.log(this.persona);
    } else {
      console.log("El logeo no se pudo realizar");
    }
    this.user.correo = null;
    this.user.contrasena = null;
  }

  recuperarTipo() {
    this.personas.subscribe((data) => {
      data.forEach((persona) => {
        if (persona.usuario.correo === this.user.correo) {
          // this.persona = persona;
          console.log("Desde servicio", persona);
          if (persona.tipo === "Vendedor") {
            this.router.navigateByUrl("/local");
            console.log("entro");
          } else {
            this.router.navigateByUrl("/inicio");
          }
        }
      });
    });

    // this.personas.forEach((personas) => {
    //   personas.forEach((persona) => {

    //   });
    // });
  }
}
