import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class SeleccionService {
  private Tipos: [] = [];
  constructor(private strg: Storage) {}

  setSeleccion(tipo: string) {
    return this.strg.get("seleccion").then((val: string[]) => {
      if (val) {
        // console.log("Se remueve:", val);
        // this.strg.remove("seleccion");
        val.push(tipo);
        this.strg.set("seleccion", val);
        // console.log("Nuevo tipo agregado: ", val);
      } else {
        this.strg.set("seleccion", [tipo]);
      }
    });
    // this.strg.set("seleccion", seleccion).then((val:string) =>{
    //   if(!val){

    //   }
    // });
  }

  getSeleccion(num?: number | null) {
    return this.strg.get("seleccion").then((val: string[]) => {
      if (num) {
        let valor = val.lastIndexOf;
        return valor;
      } else {
        return val;
      }
    });
  }

  // deleteSeleccion() {
  //   return this.strg.get("seleccion").then((seleccion: string) => {
  //     if (!seleccion) {
  //       return null;
  //     } else {
  //       this.strg.remove("seleccion");
  //       return null;
  //     }
  //   });
  // }
}
