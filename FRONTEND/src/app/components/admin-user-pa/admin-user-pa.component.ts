import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';
@Component({
  selector: 'app-admin-user-pa',
  templateUrl: './admin-user-pa.component.html',
  styleUrls: ['./admin-user-pa.component.css']
})
export class AdminUserPaComponent implements OnInit {
  name = new FormControl('');
  username = new FormControl('');
  region = new FormControl('');
  puntoAtencion = new FormControl('');
  listaRegiones: any[] = [];
  listaEstados: any[] = [];
  codigoRegion = new FormControl(0);
  codigoEstado = new FormControl(0);
  constructor(
    private servicios: Servicios
  ) { }

  ngOnInit(): void {
    this.listaEstados = this.obtenerEstados(1);
    //this.listaRegiones = this.obtenerRegion(3);
    this.name.setValue('Administracion de Usuarios por Puntos de Atencion');
    this.username.setValue('ldeleonr9');
    this.region.setValue('central');
    this.puntoAtencion.setValue('Banco Central');
  }

 /*  obtenerRegion(codigo: any):any {
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res=>{
      console.log('regiones',res);
      return res;
    });
  } */

  obtenerEstados(codigo: any):any {
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res=>{
      console.log('estados',res);
      return res;
    });
  }

  selectListDepartamentos(evento: any, valor: any) {
    console.log(valor.value);
    // this.getDatoDepartamento(valor.value);
  }

}

export interface Identificacion {
  username: string;
  region: string;
  puntoAtencion: string;
}
