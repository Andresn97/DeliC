import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";

@Injectable({
  providedIn: "root",
})
export class AccesoGuard implements CanActivate {
  constructor(private lgn: LoginService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.lgn.estaRegistrado) {
      console.log("Logeado desde Guard");

      return true;
    }
    console.log("Acceso Denegado");
    this.router.navigateByUrl("/");
    return false;
  }
}
