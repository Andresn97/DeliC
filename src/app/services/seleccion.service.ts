import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class SeleccionService {
  constructor(private strg: Storage) {}

  setSeleccion(seleccion: string) {
    this.strg.get("seleccion").then((val: string) => {
      if (!val) {
        this.strg.set("seleccion", seleccion);
      } else {
        console.log("Se remueve:", val);
        this.strg.remove("seleccion");
        this.strg.set("seleccion", seleccion).then((val: string) => {
          console.log("Selección: ", val);
        });
      }
    });
    // this.strg.set("seleccion", seleccion).then((val:string) =>{
    //   if(!val){

    //   }
    // });
  }

  getSeleccion() {
    return this.strg.get("seleccion").then((val) => {
      console.log("La selección realizada fue: ", val);

      return val;
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
