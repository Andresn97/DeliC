import { Component, OnInit } from "@angular/core";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-inicio",
  templateUrl: "./inicio.page.html",
  styleUrls: ["./inicio.page.scss"],
})
export class InicioPage implements OnInit {
  constructor(private lgn: LoginService, private router: Router) {}

  ngOnInit() {}

  salir() {
    const logOut = this.lgn.logOut();
    if (logOut) {
      console.log("Usuario salió exitosamente");
      this.router.navigateByUrl("/");
    } else {
      console.log("Ocurrió un error en cerrar la Sesión");
    }
  }
}
