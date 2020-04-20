import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";

import { Local } from "../models/local";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  private dbPath: string = "/locales";
  private localList: AngularFireList<Local> = null;

  constructor(private db: AngularFireDatabase) {
    this.localList = this.db.list(this.dbPath);
  }

  guardarLocal(local: Local) {
    local.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    // persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
    //   persona.fechaNacimiento
    // );
    this.localList.push(local);
  }

  getLocalList(): AngularFireList<Local> {
    return this.localList;
  }

  editarLocal(id: string, local: Local): Promise<void> {
    return this.localList.update(id, local);
  }

  eliminarLocal(id: string): Promise<void> {
    return this.localList.remove(id);
  }
}
