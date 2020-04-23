import { Usuario } from "./usuario";

export class HistorialQR {
  enlace: string;
  formato?: string;
  usuario?: Usuario;
  fechaRegistro: any;

  constructor(formato: string, enlace: string) {
    this.enlace = enlace;
    this.formato = formato;
  }
}
