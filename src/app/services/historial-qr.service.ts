import { Injectable } from "@angular/core";
import { HistorialQR } from "../models/historial-qr";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root",
})
export class HistorialQRService {
  codigos: HistorialQR[] = [];
  private dbPath: string = "/historialQR";
  private histQRList: AngularFireList<HistorialQR> = null;

  constructor(private db: AngularFireDatabase) {
    this.histQRList = this.db.list(this.dbPath);
  }

  guardarHistorialQR(tipo: string, enlace: string) {
    console.log(tipo);
    console.log(enlace);

    const nuevoEnlace = new HistorialQR(tipo, enlace);
    this.codigos.unshift(nuevoEnlace);
    console.log(this.codigos);
  }

  crearHistorialQR(historial: HistorialQR) {
    historial.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    this.histQRList.push(historial);
  }

  getHistorialQR() {
    return this.histQRList;
  }
}
