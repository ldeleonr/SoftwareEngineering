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
  codigoRegion = new FormControl('');
  codigoEstado = new FormControl('');
  nombrePunto = new FormControl('');
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
      this.msg = 'campo agregado exitosamente';
      this.obtenerPuntosAtencion();
    },error=>{
      this.msg = 'No se ha podido ingresar el punto de atención';
    });

  }
  obtenerPuntosAtencion() {
    this.servicios.getAllPuntosAtencioin().subscribe(resp=>{
      console.log(resp);
      this.employees = resp;
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
  editEmployee(i):void {
    this.hideUpdate = false;
    console.log(this.employees[i]);

   this.userFormUpdate.patchValue({
    id:i,
    region: this.employees[i].region,
    estado: this.employees[i].estado,
    nombre : this.employees[i].nombre
    });
    console.log(this.userFormUpdate);

    this.model2.name = this.employees[i].region;
    this.model2.position = this.employees[i].nombre;
    this.model2.email = this.employees[i].estado;
    console.log(this.employees[i].name);
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
      this.listaEstados = res;
      console.log(res);
    });
  }

  selectListDepartamentos(evento: any, valor: any) {
    console.log(valor.value);
    // this.getDatoDepartamento(valor.value);
  }

}
