import { Component, OnInit } from "@angular/core";
import { SeleccionService } from "src/app/services/seleccion.service";

@Component({
  selector: "app-seleccion",
  templateUrl: "./seleccion.page.html",
  styleUrls: ["./seleccion.page.scss"],
})
export class SeleccionPage implements OnInit {
  constructor(private slct: SeleccionService) {}

  ngOnInit() {}

  guardarSeleccion(seleccion: string) {
    // console.log(seleccion);
    this.slct.setSeleccion(seleccion);
    this.slct.getSeleccion().then((val) => {
      console.log("Tipo:", val);
    });
  }
}
