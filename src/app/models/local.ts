import { Usuario } from "./usuario";

export class Local {
  usuario: Usuario[];
  nombre: string;
  url: string;
  sector: string;
  descripcion?: string;
  slogan?: string;
  fechaRegistro?: any;
  activo: boolean;
}
