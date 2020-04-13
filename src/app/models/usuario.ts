import { Binary } from "@angular/compiler";

export class Usuario {
  correo: string;
  nombre?: string;
  contrasena?: any;
  perfilFacebook: boolean;
  estado?: string = "Activo";
  activo?: boolean = true;
}
