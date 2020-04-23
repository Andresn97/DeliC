import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Pregunta } from "src/app/models/pregunta";

@Component({
  selector: "app-opinion-usuario",
  templateUrl: "./opinion-usuario.page.html",
  styleUrls: ["./opinion-usuario.page.scss"],
})
export class OpinionUsuarioPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  form1: boolean;
  form2: boolean;
  preguntas: Pregunta[];
  opinion: string;
  pregunta: Pregunta;
  @Input() plato;
  cancela: boolean = false;

  constructor(private modalCtr: ModalController) {}

  ngOnInit() {
    this.preguntas = [];
  }

  cerrarOpinion(cancela?: boolean) {
    // if (cancela) {
    //   this.cancela = cancela;
    // }
    // console.log("cancela:", this.cancela);

    this.modalCtr.dismiss({
      preguntas: this.preguntas,
      plato: this.plato,
      cancela: this.cancela,
    });
  }

  pregunta1(enunciado: string, respuesta: string) {
    let pregunta = new Pregunta();
    pregunta.enunciado = enunciado;
    pregunta.respuesta = respuesta;
    pregunta.activo = true;
    this.preguntas.push(pregunta);
  }
  pregunta2(enunciado: string, respuesta: string) {
    let pregunta = new Pregunta();
    pregunta.enunciado = enunciado;
    pregunta.respuesta = respuesta;
    pregunta.activo = true;
    this.preguntas.push(pregunta);
  }
  pregunta3(enunciado: string, respuesta: string) {
    let pregunta = new Pregunta();
    pregunta.enunciado = enunciado;
    pregunta.respuesta = respuesta;
    pregunta.activo = true;
    this.preguntas.push(pregunta);
  }
  pregunta4(enunciado: string, respuesta: string) {
    let pregunta = new Pregunta();
    pregunta.enunciado = enunciado;
    pregunta.respuesta = respuesta;
    pregunta.activo = true;
    this.preguntas.push(pregunta);
  }
  pregunta5(enunciado: string, respuesta: string) {
    let pregunta = new Pregunta();
    pregunta.enunciado = enunciado;
    pregunta.respuesta = respuesta;
    pregunta.activo = true;
    this.preguntas.push(pregunta);
  }

  registrarOpinion() {
    this.cerrarOpinion();
  }
}
