import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';
@Component({
  selector: 'app-admin-user-pa',
  templateUrl: './admin-user-pa.component.html',
  styleUrls: ['./admin-user-pa.component.css']
})
export class AdminUserPaComponent implements OnInit {
  listaRegiones: any[] = [];
  listaEstados: any[] = [];
  listaPuntos: any[] = []
  listaCargos: any[] = [];
  listaUsuarios: any[] = [];
  listaTempUsers: any[] = [];
  title = 'Angular Crud';
  region = new FormControl('');
  userForm: FormGroup;
  constructor(
    private servicios: Servicios,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      region: ['' , [Validators.required]],
      punto: ['', [Validators.required]],
      dpi: ['', [Validators.required]],
      primerNombre : ['', [Validators.required]],
      segundoNombre : ['', [Validators.required]],
      primerApellido : ['', [Validators.required]],
      segundoApellido : ['', [Validators.required]],
      email : ['', [Validators.email]],
      cargo : ['',[Validators.required]]
    });
   }

    msg = '';
    employees = [];
    model: any = {};
    model2: any = {};
    users: any = {};
    hideUpdate = true;

  onSubmit() { }

  ngOnInit(): void {
    this.obtenerRegion(3);
    this.obtenerEstado(1);
    this.obtenerCargos(5);
    this.obtenerPuntosAtencion();
    this.obtenerUsuarios();

  }

  saveUser(){
    console.log(this.userForm.value);
    this.model.punto = this.userForm.value.punto;
    this.model.dpi = this.userForm.value.dpi;
    this.model.primer_nombre = this.userForm.value.primerNombre;
    this.model.primer_apellido = this.userForm.value.primerApellido;
    this.model.email = this.userForm.value.email;
    this.model.cargo = this.userForm.value.cargo;
    this.employees.push(this.model);
    const user = {
      dpi: this.userForm.value.dpi,
      primernombre: this.userForm.value.primerNombre,
      segundonombre:this.userForm.value.segundoNombre,
      cargo: parseInt(this.userForm.value.cargo, 10) ,
      primerapellido: this.userForm.value.primerApellido,
      segundoapellido: this.userForm.value.segundoApellido,
      email: this.userForm.value.email,
      usuario: this.userForm.value.email,
      estado: 1,
      codigopuntoasignado: parseInt(this.userForm.value.punto, 10),
      password: 'Usuario.1'
    };
    this.servicios.addUser(user).subscribe(res=>{
      console.log(res);
      this.obtenerUsuarios();
    });
    console.log('model----', this.model);
    console.log('formGroup----', this.userForm.value);
    this.clean();

    this.msg = 'Se guardarón correctamente los Datos del Usuario de Punto de Atención';

  }


  obtenerEstados(codigo: any):any {
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res=>{
      console.log('estados', res);
      return res;
    });
  }

  addEmployee():void{
    console.log(this.userForm.value);
    this.employees.push(this.model);
    console.log(this.model);
    this.msg = 'Se guardarón correctamente los Datos del Usuario de Punto de Atención';
  }

  deleteEmployee(i):void {
    var answer = confirm('¿Estas seguro querer eliminar los Datos del Usuario?');
    if(answer) {
      this.employees.splice(i, 1);
      this.msg = 'Se eliminaron correctamente los Datos del Usuario de Punto de Atención';
    }
  }

  myValue;

  editEmployee(i):void {
    this.hideUpdate = false;
    this.model2.region = this.employees[i].region;
    this.model2.punto = this.employees[i].punto;
    this.model2.dpi = this.employees[i].dpi;
    this.model2.primer_nombre = this.employees[i].primer_nombre;
    this.model2.segundo_nombre = this.employees[i].segundo_nombre;
    this.model2.primer_apellido = this.employees[i].primer_apellido;
    this.model2.segundo_apellido = this.employees[i].segundo_apellido;
    this.model2.email = this.employees[i].email;
    this.model2.cargo = this.employees[i].cargo;
    this.myValue = i;
  }

  updateEmployee():void {
    let i = this.myValue;
    for(let j = 0; j < this.employees.length; j++){
      if(i == j) {
        this.employees[i] = this.model2;
        this.msg = 'Se actualizaron correctamente los Datos del Usuario de Punto de Atención';
        this.model2 = {};
      }
    }
  }

  closeAlert():void {
    this.msg = '';
  }
  obtenerRegion(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
      this.listaRegiones = res;
      console.log(res);
    });
  }
  obtenerCargos(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
      this.listaCargos = res;
      console.log(res);
    });
  }
  obtenerEstado(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
     // tslint:disable-next-line: prefer-const
     let listatemp = [];
     res.forEach(function (value) {
      console.log(value);
      if(value.nombre !== 'ELIMINADO'){
        listatemp.push(value);
      }
    });
     this.listaEstados = listatemp;
     console.log(listatemp);
    });
  }

  clean(){
    this.userForm.patchValue({
      punto: '',
      dpi: '',
      primerNombre: '',
      segundoNombre: '',
      primerApellido: '',
      segundoApellido: '',
      email: '',
      cargo: '',
      region: ''
      });
  }

  obtenerUsuarios() {
    this.servicios.getAllUsers().subscribe(resp => {
      this.listaUsuarios = resp;
      this.employees=[];
      // tslint:disable-next-line: forin
      // tslint:disable-next-line: prefer-for-of
      console.log('LOS USUARIOS OBTENIDOOOOS', resp);
      for (let i = 0; i < resp.length; i++) {
        let user: Object = {
          id : resp[i].id,
          punto : this.listaUsuarios[i].codigopuntoasignado,
          dpi : this.listaUsuarios[i].dpi,
          primer_nombre : this.listaUsuarios[i].primernombre,
          primer_apellido : this.listaUsuarios[i].primerapellido,
          email : this.listaUsuarios[i].email,
          cargo : this.listaUsuarios[i].cargo
        };
        this.employees.push(user);

      }
     // this.employees.push(this.users);
      console.log('LO QUE SE GUARDA ES',this.listaTempUsers);

    });
  }

  obtenerPuntosAtencion() {
    this.servicios.getAllPuntosAtencioin().subscribe(resp=>{
      let listatemp=[];
      resp.forEach(function (value) {
       // console.log(value);
        if(value.estado !== 'ELIMINADO' && value.estado !== 'INACTIVO'){
          listatemp.push(value);
        }
      });
      console.log(listatemp);
      this.listaPuntos = resp;
      // this.employees = resp;
    });
  }


}



