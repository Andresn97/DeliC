import { Injectable } from "@angular/core";
import { HistorialQR } from "../models/historial-qr";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
import * as firebase from "firebase";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class HistorialQRService {
  codigos: HistorialQR[] = [];
  private dbPath: string = "/historialQR";
  private histQRList: AngularFireList<HistorialQR> = null;

  constructor(private db: AngularFireDatabase, private router: Router) {
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
    this.histQRList
      .push(historial)
      .then((data) => {
        this.router.navigateByUrl(historial.enlace);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getHistorialQR() {
    return this.histQRList;
  }
}
