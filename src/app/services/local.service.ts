import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { Local } from "../models/local";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  private dbPath: string = "/locales";
  private localList: AngularFireList<Local> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController
  ) {
    this.localList = this.db.list(this.dbPath);
  }

  guardarLocal(local: Local) {
    local.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    this.localList.push(local).then((data) => {
      this.mostrarMensaje(`${local.nombre} se añadió exitosamente a DeliC`);
    });
  }

  getLocalList(): Observable<Local[]> {
    let datos: Observable<Local[]>;

    return (datos = (this.localList = this.db.list(
      this.dbPath
    )).valueChanges());
  }

  editarLocal(id: string, local: Local): Promise<void> {
    return this.localList.update(id, local);
  }

  eliminarLocal(id: string): Promise<void> {
    return this.localList.remove(id);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
    });
    toast.present();
  }
}
