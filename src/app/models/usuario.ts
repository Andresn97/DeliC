export class Usuario {
  correo: string;
  nombre?: string;
  contrasena: string;
  perfilFacebook: boolean;
  estado?: string = "Activo";
  activo?: boolean = true;
}
