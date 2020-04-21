import { Component, OnInit } from "@angular/core";
import { Local } from "src/app/models/local";
import { LocalService } from "src/app/services/local.service";
import { Usuario } from "src/app/models/usuario";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";
import { error } from "protractor";

@Component({
  selector: "app-registro-local",
  templateUrl: "./registro-local.page.html",
  styleUrls: ["./registro-local.page.scss"],
})
export class RegistroLocalPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };
  form1: boolean;
  form2: boolean;
  local: Local;
  usuario: Usuario;

  constructor(
    private localSrvc: LocalService,
    private router: Router,
    private lgnSrvc: LoginService
  ) {
    this.local = {
      usuario: [],
      nombre: null,
      url: null,
      slogan: null,
      sector: null,
      descripcion: null,
      fechaRegistro: null,
      activo: true,
    };
  }

  ngOnInit() {}

  primerFormulario(resp: any) {
    this.form1 = resp.invalid;
  }

  segundoFormulario(resp: any) {
    this.form2 = resp.invalid;
  }

  registrarLocal() {
    if (!this.form1 && !this.form2) {
      this.local.activo = true;
      this.local.url = `http://localhost:8100/local/${this.local.nombre}`;
      this.lgnSrvc.retornarUsuario().then(
        (data) => {
          this.usuario = new Usuario();
          this.usuario.correo = data.email;
          this.local.usuario.push(this.usuario);
          this.localSrvc.guardarLocal(this.local);
        },
        (error) => {
          console.log("El usuario no se logeo correctamente");
        }
      );

      //
      console.log("Estos son los datos del Local:", this.local);
      this.router.navigateByUrl(`/local/${this.local.nombre}`);
    }
  }
}
