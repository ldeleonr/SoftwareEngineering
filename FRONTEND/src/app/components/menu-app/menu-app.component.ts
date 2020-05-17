import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';


@Component({
  selector: 'app-menu-app',
  templateUrl: './menu-app.component.html',
  styleUrls: ['./menu-app.component.css']
})
export class MenuAppComponent implements OnInit {

  //VARIABLES Y OBJETOS
  nameAPP = 'Quejas y Denuncias/Ingreso de queja por mal servicio o servicio no conforme';
  recaptchaReactive:FormControl;
  captchaForm:FormGroup;


  constructor(
    private servicios: Servicios,
    private fb: FormBuilder,
    private formBuild: FormBuilder
  ) {


    //FORMGROUP PARA MANEJO PRINCIPAL
    this.captchaForm = this.formBuild.group({
      recaptchaReactive2:  ['']

    });
  }

  onSubmit() {

  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);

  }

  ngOnInit(): void {
   // this.obtenerTiposQuejas();

  }



  }



