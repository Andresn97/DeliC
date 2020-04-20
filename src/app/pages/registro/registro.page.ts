import { Component, OnInit } from "@angular/core";
import { Persona } from "src/app/models/persona";
import { SeleccionService } from "src/app/services/seleccion.service";
import { Usuario } from "src/app/models/usuario";
import { PickerController } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { LoginService } from "src/app/services/login.service";
import { Router } from "@angular/router";
import { PersonaService } from "src/app/services/persona.service";

@Component({
  selector: "app-registro",
  templateUrl: "./registro.page.html",
  styleUrls: ["./registro.page.scss"],
})
export class RegistroPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  seleccion: string;
  persona: Persona;
  usuario: Usuario;
  confirmar_contrasena: string;
  form1: boolean;
  form2: boolean;
  form3: boolean;
  pass: string;

  constructor(
    private sltc: SeleccionService,
    private pickerCtrll: PickerController,
    private lgn: LoginService,
    private prsSvc: PersonaService,
    private router: Router
  ) {
    this.usuario = {
      correo: null,
      nombre: null,
      contrasena: null,
      perfilFacebook: null,
    };

    this.persona = {
      nombres: {
        primerNombre: null,
        segundoNombre: null,
      },
      apellidos: {
        primerApellido: null,
        segundoApellido: null,
      },
      tipo: "Vendedor",
      genero: null,
      edad: null,
      fechaNacimiento: null,
      usuario: this.usuario,
      celular: null,
    };
  }

  ngOnInit() {
    // this.sltc.getSeleccion().then((val: string) => {
    //   this.seleccion = val;
    // console.log("Seleccion: ", this.seleccion);
    // });
  }

  //Validar formularios
  primerFormulario(resp: any) {
    this.form1 = resp.invalid;
  }

  segundoFormulario(resp: any) {
    this.form2 = resp.invalid;
  }

  tercerFormulario(resp: any) {
    this.form3 = resp.invalid;
  }

  async registroUsuario() {
    if (!this.form1 && !this.form2 && !this.form3 && this.persona.genero) {
      this.persona.usuario.contrasena = this.pass;
      const user = await this.lgn.Registro(this.persona.usuario);
      this.persona.usuario.perfilFacebook = false;
      this.persona.usuario.activo = true;
      this.persona.usuario.estado = "Activo";
      if (user) {
        // this.persona.fechaRegistro = new Date();
        this.persona.activo = true;
        console.log("El usuario se registró correctamente", user);
        this.prsSvc.crearPersona(this.persona);
        console.log("Estos son los datos de la persona:", this.persona);
        console.log("Tipo", this.persona.tipo);

        this.router.navigateByUrl("/inicio");
      }
    } else {
      console.log("Revise los campos");
    }
  }

  async mostrarGeneros() {
    let optns: PickerOptions = {
      columns: [
        {
          name: "genero",
          options: [
            { text: "Masculino", value: "M" },
            { text: "Femenino", value: "F" },
          ],
        },
      ],
      cssClass: "escogerGenero",
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
        },
        {
          text: "Escoger",
        },
      ],
    };
    let seleccion = await this.pickerCtrll.create(optns);
    seleccion.present();
    seleccion.onDidDismiss().then(async (data) => {
      let col = await seleccion.getColumn("genero");
      console.log("Columna:", col);
      this.persona.genero = col.options[col.selectedIndex].text;
    });
  }
}
