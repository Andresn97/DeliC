import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import { Plato } from "../models/plato";
import * as firebase from "firebase";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class PlatoService {
  private dbPath: string = "/platos";
  private platoList: AngularFireList<Plato> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController
  ) {
    this.platoList = this.db.list(this.dbPath);
  }

  crearPlato(plato: Plato) {
    plato.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    // persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
    //   persona.fechaNacimiento
    // );
    this.platoList.push(plato).then((data) => {
      this.mostrarMensaje(`${plato.nombre} se añadió a tu Local`);
    });
  }

  getPlatoList(): Observable<Plato[]> {
    let plato: Observable<Plato[]>;

    return (plato = (this.platoList = this.db.list(
      this.dbPath
    )).valueChanges());
  }

  editarPlato(id: string, plato: Plato) {
    return this.platoList.update(id, plato);
  }

  eliminarPlato(id: string): Promise<void> {
    return this.platoList.remove(id);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
    });
    toast.present();
  }
}
