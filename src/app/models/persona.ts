import { Usuario } from "./usuario";

export class Persona {
  nombres: {
    primerNombre: string;
    segundoNombre?: string;
  };
  apellidos: {
    primerApellido: string;
    segundoApellido?: string;
  };
  genero?: string;
  edad?: number;
  fechaNacimiento?: Date;
  usuario: Usuario;
  celular?: string;
  fechaRegistro?: Date = new Date();
  activo?: boolean = true;
}
