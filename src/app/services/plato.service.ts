import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
} from "@angular/fire/database/database";
import { Plato } from "../models/plato";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class PlatoService {
  private dbPath: string = "/platos";
  private platoList: AngularFireList<Plato> = null;

  constructor(private db: AngularFireDatabase) {
    this.platoList = this.db.list(this.dbPath);
  }

  crearPlato(plato: Plato) {
    plato.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    // persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
    //   persona.fechaNacimiento
    // );
    this.platoList.push(plato);
  }

  getPlatoList(): AngularFireList<Plato> {
    return this.platoList;
  }

  editarPlato(id: string, plato: Plato) {
    return this.platoList.update(id, plato);
  }

  eliminarPlato(id: string): Promise<void> {
    return this.platoList.remove(id);
  }
}
