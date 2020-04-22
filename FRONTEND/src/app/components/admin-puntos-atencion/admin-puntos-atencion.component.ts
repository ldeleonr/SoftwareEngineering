import { Component, OnInit } from '@angular/core';
import { Servicios } from '../../servicios/servicios.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-admin-puntos-atencion',
  templateUrl: './admin-puntos-atencion.component.html',
  styleUrls: ['./admin-puntos-atencion.component.css']
})
export class AdminPuntosAtencionComponent implements OnInit {
  userForm = this.fb.group({
    region: [''],
    estado: [''],
    nombre : ['']
  });
  userFormUpdate = this.fb.group({
    id:[''],
    region: [''],
    estado: [''],
    nombre : ['']
  });

  name = new FormControl('');
  username = new FormControl('');
  region = new FormControl('');
  puntoAtencion = new FormControl('');
  listaRegiones: any[] = [];
  listaEstados: any[] = [];
  estadosTemp: any[] = [];
  codigoRegion = new FormControl('');
  codigoEstado = new FormControl('');
  nombrePunto = new FormControl('');
  estados: any;
  regiones: any;
  constructor(
    private servicios: Servicios,
    private fb: FormBuilder,
  ) { }

  onSubmit(){

  }
    registrar() {
      this.model.name = this.userForm.value.region;
      this.model.position = this.userForm.value.nombre;
      this.model.email = this.userForm.value.estado;
      const puntoAt = {
        nombre: this.model.position,
        estado: this.model.email,
        codigodepto:1,
        codigoregion:this.model.name
      };

      this.addEmployee(puntoAt);
      console.log(this.model);
    }
  title:string = 'Angular Crud';

  msg:string = '';
  employees = [

  ];
  model:any = {};
  model2:any = {};
  hideUpdate:boolean = true;

  addEmployee(puntoAtencion : any):void{
    // this.employees.push(this.model);
    this.servicios.addPuntoAtencion(puntoAtencion).subscribe(res=>{
      this.msg = 'Se guardaron correctamente los datos del Punto de atención';
      this.obtenerPuntosAtencion();
    },error=>{
      this.msg = 'No se ha podido ingresar el punto de atención';
    });

  }
  obtenerPuntosAtencion() {
    this.servicios.getAllPuntosAtencioin().subscribe(resp=>{
      let listatemp=[];
      resp.forEach(function (value) {
       // console.log(value);
        if(value.estado !== 'ELIMINADO'){
          listatemp.push(value);
        }
      });
      console.log(listatemp);
      this.employees = resp;
    });
  }

  // tslint:disable-next-line: member-ordering
  pageActual: number = 1;
  update() {

    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < this.listaRegiones.length; j++) {
      if (this.listaRegiones[j].nombre === this.model2.name){
         this.regiones = this.listaRegiones[j].codigodato;
         console.log('regioinessss',this.regiones);
      }
    }
    const pAtencion = {
       nombre: this.model2.position,
       codigodepto: 1,
       codigoregion: this.regiones,
       estado: parseInt(this.model2.email, 10)
    }
    console.log(pAtencion);
    this.servicios.updatePuntosAtencion(parseInt(this.model2.id, 10), pAtencion).subscribe(res=>{
      this.msg = 'Punto de atención actualizado';
      this.obtenerPuntosAtencion();
    });

  }
  deleteEmployee(i):void {
    var answer = confirm('Estas seguro querer eliminarlo?');
    if(answer) {
      this.employees.splice(i, 1);
      this.msg = 'campo eliminado';
    }
  }

  myValue;

  delete(i){
    var answer = confirm('Estas seguro querer eliminarlo?');
    if(answer) {
    console.log(this.employees[i]);
    // tslint:disable-next-line: prefer-for-of
    for (let j = 0; j < this.listaRegiones.length; j++) {
      if (this.listaRegiones[j].nombre === this.employees[i].region){
         this.regiones = this.listaRegiones[j].codigodato;
         console.log('regioinessss', this.regiones);
      }
    }
    // tslint:disable-next-line: prefer-for-of
    for (let k = 0; k < this.listaEstados.length; k++) {
      if (this.listaEstados[k].nombre === this.employees[i].estado){
         this.estados = this.listaEstados[k].codigodato;
         console.log('estaddddosss', this.estados);
      }
    }

    const pAtencion = {
       nombre: this.employees[i].nombre,
       codigodepto: 1,
       codigoregion: this.regiones,
       estado: 32
    }
    console.log('PUNTOOOO A ELIMINAR',pAtencion);
    this.servicios.updatePuntosAtencion(parseInt(this.employees[i].id, 10), pAtencion).subscribe(res=>{
      this.msg = 'Punto de atención Eliminado';
      this.obtenerPuntosAtencion();
    });
  }

    /* this.hideUpdate = false;
    var answer = confirm('Estas seguro querer eliminarlo?');
    if(answer) {
      this.employees.splice(i, 1);
      this.msg = 'campo eliminado';
    }
    console.log(this.employees[i]); */
  }
  editEmployee(i):void {
    this.hideUpdate = false;
    this.userFormUpdate.patchValue({
    id: i,
    region: this.employees[i].region,
    estado: this.employees[i].estado,
    nombre : this.employees[i].nombre
    });
    this.model2.name = this.employees[i].region;
    this.model2.position = this.employees[i].nombre;
    this.model2.email = this.employees[i].estado;
    this.model2.id = i + 1;

    //console.log(this.model2);
    this.myValue = i;
  }
  updateEmployee():void {
    let i = this.myValue;
    for(let j = 0; j < this.employees.length; j++){
      if(i == j) {
        this.employees[i] = this.model2;
        this.msg = 'campo actualizado';
        this.model2 = {};
      }
    }
  }

  closeAlert():void {
    this.msg = '';
  }


  ngOnInit() {
    this.obtenerRegion(3);
    this.obtenerEstado(1);
    this.obtenerPuntosAtencion();
    this.name.setValue('Administracion de Usuarios por Puntos de Atencion');
    this.username.setValue('ldeleonr9');
    this.region.setValue('central');
    this.puntoAtencion.setValue('Banco Central');
  }

  obtenerRegion(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
      this.listaRegiones = res;
      console.log(res);
    });
  }

  obtenerEstado(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
     let listatemp = [];
     res.forEach(function (value) {
      console.log(value);
      if(value.nombre !== 'ELIMINADO'){
        listatemp.push(value);
      }
    });
    this.listaEstados = res;
      console.log(listatemp);
    });
  }


  selectListDepartamentos(evento: any, valor: any) {
    console.log(valor.value);
    // this.getDatoDepartamento(valor.value);
  }

}
