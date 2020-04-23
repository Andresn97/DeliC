import { Usuario } from "./usuario";
import { Pregunta } from "./pregunta";
import { Plato } from "./plato";

export class Opinion {
  usuario: Usuario;
  plato: Plato;
  preguntas: Pregunta[];
  observacion: string;
  fechaRegistro: any;
  activo: boolean;
}
