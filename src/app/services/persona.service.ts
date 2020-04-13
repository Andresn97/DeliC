import { Injectable } from "@angular/core";
import {
  AngularFireDatabase,
  AngularFireList,
  // AngularFireList,
  // AngularFireObject,
} from "@angular/fire/database";
// import {
//   AngularFirestore,
//   AngularFirestoreCollection,
//   DocumentReference,
// } from "@angular/fire/firestore";
import { Persona } from "../models/persona";
import * as firebase from "firebase";
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

  constructor(private db: AngularFireDatabase) {
    //Definiendo la colección
    // this.personaCollection = this.db.collection<Persona>("personas");

    //Se regresa la colección localmente al servicio
    // this.personas = this.personaCollection.snapshotChanges().pipe(
    //   map((actions) => {
    //     return actions.map((a) => {
    //       const data = a.payload.doc.data();
    //       const id = a.payload.doc.id;
    //       return { id, ...data };
    //     });
    //   })
    // );

    this.personaList = this.db.list(this.dbPath);
  }

  crearPersona(persona: Persona): void {
    // return this.personaCollection.add(persona);
    persona.fechaRegistro = firebase.firestore.Timestamp.fromDate(new Date());
    persona.fechaNacimiento = firebase.firestore.Timestamp.fromDate(
      persona.fechaNacimiento
    );
    this.personaList.push(persona);
  }

  // getPersona(id: string): Promise<void> {
  // this.bookingRef = this.db.object("/persona/" + id);
  // return this.bookingRef;
  // return;
  // }

  getPersonaList(): AngularFireList<Persona> {
    // return this.db.collection("persona").snapshotChanges();
    return this.personaList;
  }

  editarPersona(id: string, persona: Persona): Promise<void> {
    // this.db.doc("persona/" + id).update(persona);
    return this.personaList.update(id, persona);
  }

  eliminarPersona(id: string): Promise<void> {
    // this.db.doc("persona/" + id).delete();
    return this.personaList.remove(id);
  }

  // crearPersona(persona: Persona) {
  //   return this.bookingListRef.push({
  //     nombres: {
  //       primerNombre: persona.nombres.primerNombre,
  //       segundoNombre: persona.nombres.segundoNombre,
  //     },
  //     apellidos: {
  //       primerApellido: persona.apellidos.primerApellido,
  //       segundoApellido: persona.apellidos.segundoApellido,
  //     },
  //     genero: persona.genero,
  //     edad: persona.edad,
  //     fechaNacimiento: persona.fechaNacimiento,
  //     usuario: {
  //       correo: persona.usuario.correo,
  //       nombre: persona.usuario.nombre,
  //       contrasena: persona.usuario.contrasena,
  //       perfilFacebook: persona.usuario.perfilFacebook,
  //       estado: persona.usuario.estado,
  //       activo: persona.usuario.activo,
  //     },
  //     celular: persona.celular,
  //     fechaRegistro: persona.fechaRegistro,
  //     activo: persona.activo,
  //   });
  // }

  // getPersonaList() {
  //   this.bookingListRef = this.db.list("/persona");
  //   return this.bookingListRef;
  // }

  // editarPersona(id, persona: Persona) {
  //   return this.bookingRef.update({
  //     nombres: {
  //       primerNombre: persona.nombres.primerNombre,
  //       segundoNombre: persona.nombres.segundoNombre,
  //     },
  //     apellidos: {
  //       primerApellido: persona.apellidos.primerApellido,
  //       segundoApellido: persona.apellidos.segundoApellido,
  //     },
  //     genero: persona.genero,
  //     edad: persona.edad,
  //     fechaNacimiento: persona.fechaNacimiento,
  //     usuario: {
  //       correo: persona.usuario.correo,
  //       nombre: persona.usuario.nombre,
  //       contrasena: persona.usuario.contrasena,
  //       perfilFacebook: persona.usuario.perfilFacebook,
  //       estado: persona.usuario.estado,
  //       activo: persona.usuario.activo,
  //     },
  //     celular: persona.celular,
  //     fechaRegistro: persona.fechaRegistro,
  //     activo: persona.activo,
  //   });
  // }

  // eliminarPersona(id: string) {
  //   this.bookingRef = this.db.object("/persona/" + id);
  //   this.bookingRef.remove();
  // }
}
