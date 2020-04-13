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
  fechaNacimiento?: any;
  usuario: Usuario;
  celular?: string;
  fechaRegistro?: any;
  activo?: boolean;
}
