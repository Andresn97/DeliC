import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-plato",
  templateUrl: "./plato.page.html",
  styleUrls: ["./plato.page.scss"],
})
export class PlatoPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  form1: boolean;
  form2: boolean;
  @Input() nombre;
  @Input() precio;
  @Input() ingredientes;
  @Input() descripcion;
  @Input() esValido;
  constructor(private modalCtr: ModalController) {}

  ngOnInit() {}

  primerFormulario(resp: any) {
    this.form1 = resp.invalid;
    console.log(this.form1);
  }

  segundoFormulario(resp: any) {
    this.form2 = resp.invalid;
  }

  cerrarPlato() {
    this.modalCtr.dismiss({
      nombre: this.nombre,
      precio: this.precio,
      ingredientes: this.ingredientes,
      descripcion: this.descripcion,
      esValido: this.esValido,
    });
  }

  registrarPlato() {
    if (!this.form1 && !this.form2) {
      this.esValido = true;
      this.cerrarPlato();
    } else {
      console.log("Llene los campos correctamente");
    }
  }
}
