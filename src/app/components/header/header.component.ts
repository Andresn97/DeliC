import { Component, OnInit, Input } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  @Input() titulo;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private lgnSrvc: LoginService
  ) {}

  ngOnInit() {}

  cerrarSesion() {
    const logOut = this.lgnSrvc.logOut();
    if (logOut) {
      console.log("Usuario salió exitosamente");
      this.router.navigateByUrl("/");
    } else {
      console.log("Ocurrió un error en cerrar la Sesión");
    }
  }
}
