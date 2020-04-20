import { Operacion } from "./operacion";

export class Rol {
  operaciones: Operacion[];
  nombre: string;
  descripcion: string;
  fechRegistro: any;
  activo: boolean;
}
