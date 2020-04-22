import { Injectable } from "@angular/core";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
//   DocumentReference,
// } from "@angular/fire/firestore";
import { Persona } from "../models/persona";
import * as firebase from "firebase";
import { Usuario } from "../models/usuario";
import { Observable } from "rxjs";
import { ToastController } from "@ionic/angular";
// import { Observable } from "rxjs";
// import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PersonaService {
  // bookingListRef: AngularFireList<any>;
  // private personas: Observable<Persona[]>;
  
  private dbPath: string = "/personas";
  private personaList: AngularFireList<Persona> = null;

  constructor(
    private db: AngularFireDatabase,
    private toastController: ToastController
  ) {
    this.personaList = this.db.list(this.dbPath);
  }

  crearPersona(persona: Persona): void {
    persona.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    // persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
    //   persona.fechaNacimiento
    // );
    this.personaList.push(persona).then((data) => {
      this.mostrarMensaje(
        `${persona.nombres.primerNombre} se registro en DeliC :)`
      );
    });
  }

  // getPersona(id: string): Promise<void> {
  // this.bookingRef = this.db.object("/persona/" + id);
  // return this.bookingRef;
  // return;
  // }

  getPersonaList(): Observable<Persona[]> {
    // return this.db.collection("persona").snapshotChanges();
    let person: Observable<Persona[]>;

    return (person = (this.personaList = this.db.list(this.dbPath, (ref) =>
      ref.orderByChild("usuario")
    )).valueChanges());
  }

  //Método en mantenimiento
  getPersona(correo: string): Observable<Persona[]> {
    let person: Observable<Persona[]>;

    return (person = (this.personaList = this.db.list(this.dbPath, (ref) =>
      ref.orderByChild("usuario")
    )).valueChanges());

    // let registro: Persona;

    // person.forEach((personas) => {
    //   personas.forEach((persona) => {
    //     if (persona.usuario.correo === correo) {
    //       registro = persona;
    //       console.log("Desde servicio", registro);
    //     }
    //   });
    // });

    // if (registro !== null) {
    //   console.log("Existe registro");

    //   return registro;
    // } else {
    //   console.log("No existe registro");

    //   return null;
    // }
  }

  editarPersona(id: string, persona: Persona): Promise<void> {
    // this.db.doc("persona/" + id).update(persona);
    return this.personaList.update(id, persona);
  }

  eliminarPersona(id: string): Promise<void> {
    // this.db.doc("persona/" + id).delete();
    return this.personaList.remove(id);
  }

  async mostrarMensaje(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 4000,
    });
    toast.present();
  }
}
