import { Component, OnInit } from "@angular/core";
import { Local } from "src/app/models/local";
import { LocalService } from "src/app/services/local.service";
import { Usuario } from "src/app/models/usuario";

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
  form3: boolean;
  local: Local;

  constructor(private localSrvc: LocalService) {
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
}
