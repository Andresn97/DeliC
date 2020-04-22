import { Component } from "@angular/core";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { PersonaService } from "src/app/services/persona.service";
import { Persona } from "src/app/models/persona";
import { Observable } from "rxjs";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  public user: Usuario = new Usuario();
  private personas: Observable<Persona[]>;
  private valores: Persona[];
  private usuario: Usuario;
  per: any;

  constructor(
    private router: Router,
    private lgnSrv: LoginService,
    private prsnSrv: PersonaService
  ) {}

  ngOnInit(): void {
    this.personas = this.prsnSrv.getPersonaList();
  }

  // ionViewWillLeave() {
  //   this.per.unsubscribe();
  // }

  // formulario.valid

  logeoUsuario() {
    const user = this.lgnSrv.Login(this.user);
    if (user) {
      console.log("Logeo con éxito");
      console.log("Usuario:", this.user.correo);
      console.log("Contraseña:", this.user.contrasena);
      //Validar el tipo de Persona
      this.recuperarTipo();
    } else {
      console.log("El logeo no se pudo realizar");
    }
    this.user.correo = null;
    this.user.contrasena = null;
  }

  recuperarTipo() {
    this.lgnSrv.retornarUsuario().then((data: firebase.User) => {
      this.usuario = new Usuario();
      this.usuario.correo = data.email;
      // this.lgnSrv.cargarCorreo(this.usuario.correo);

      //Extracción de datos de Persona
      this.per = this.personas.subscribe(
        (datos) => {
          this.valores = datos;

          this.valores.forEach((persona) => {
            if (persona.usuario.correo === this.usuario.correo) {
              if (persona.tipo == "Vendedor") {
                this.router.navigateByUrl("/local");
              } else {
                this.router.navigateByUrl("/inicio");
              }

              console.log("Usuario:", this.usuario);

              console.log("Esta es la persona:", persona);
            }
          });
        },
        (error) => {
          console.log("El usuario no se logeo correctamente");
        }
      );
    });
  }
  S;
}
