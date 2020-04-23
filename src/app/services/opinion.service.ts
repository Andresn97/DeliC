import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { ToastController } from "@ionic/angular";
import { Opinion } from "../models/opinion";
import * as firebase from "firebase";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class OpinionService {
  private dbPath: string = "/opiniones";
  private opinionList: AngularFireList<Opinion> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController
  ) {
    this.opinionList = this.db.list(this.dbPath);
  }

  crearOpinion(opinion: Opinion) {
    opinion.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    // persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
    //   persona.fechaNacimiento
    // );
    this.opinionList.push(opinion).then((data) => {
      this.mostrarMensaje(
        `Su opinión se añadió exitosamente, Muchas Gracias!!`
      );
    });
  }

  getOpinionList(): Observable<Opinion[]> {
    let opinion: Observable<Opinion[]>;

    return (opinion = (this.opinionList = this.db.list(
      this.dbPath
    )).valueChanges());
  }

  editarOpinion(id: string, opinion: Opinion) {
    return this.opinionList.update(id, opinion);
  }

  eliminarOpinion(id: string): Promise<void> {
    return this.opinionList.remove(id);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3500,
    });
    toast.present();
  }
}
