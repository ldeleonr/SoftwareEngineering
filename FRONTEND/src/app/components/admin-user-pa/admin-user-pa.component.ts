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
  listaPuntos: any[] = [];
  listaCargos: any[] = [];
  listaUsuarios: any[] = [];
  listaTempUsers: any[] = [];
  title = 'Angular Crud';
  region = new FormControl('');
  estadoUpdate = new FormControl('');
  userForm: FormGroup;
  userFormUpdate: FormGroup;
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
    this.userFormUpdate = this.fb.group({
      id:[''],
      estado: ['' ],
      correo : [''],
      cargo : ['']
    });
   }
   pageActual: number = 1;
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
    console.log('eliminar', this.employees[i]);
    var answer = confirm('¿Estas seguro querer eliminar los Datos del Usuario?');
    if(answer) {
      this.employees.splice(i, 1);
      this.msg = 'Se eliminaron correctamente los Datos del Usuario de Punto de Atención';
    }
  }

  myValue;

  editEmployee(i):void {
    console.log('esto es employee', this.employees[i]);

    this.userFormUpdate.patchValue({
      id: this.employees[i].id,
      correo: this.employees[i].email,
      });

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
    this.model2.estado = this.employees[i].estado;
    console.log(this.model2);
    this.myValue = i;
  }

  updateEmployee():void {
    console.log('ESTO LLEGA EN LISTA para modificar ', this.listaPuntos);
    console.log('ESTO LLEGA EN MODEL para modificar ',  this.employees[this.userFormUpdate.value.id-1]);
    console.log(this.employees[this.userFormUpdate.value.id]);
    let codigopunto: 0;
    for (let k = 0; k < this.listaPuntos.length ; k++) {
    // console.log('EL CLAVO', this.employees[this.userFormUpdate.value].id);
      if (this.listaPuntos[k].id === this.employees[this.userFormUpdate.value.id-1].punto) {
         // console.log();
          codigopunto = this.listaPuntos[k].id;
        }
    }

   // console.log('CODIGOOOOOO PUNTOOOO', codigopunto);
    const user = {
      dpi: this.employees[this.userFormUpdate.value.id-1].dpi,
      primernombre:this.employees[this.userFormUpdate.value.id-1].primer_nombre,
      segundonombre:this.employees[this.userFormUpdate.value.id-1].segundo_nombre,
      cargo: parseInt(this.userFormUpdate.value.cargo, 10) ,
      primerapellido: this.employees[this.userFormUpdate.value.id-1].primer_apellido,
      segundoapellido: this.employees[this.userFormUpdate.value.id-1].segundo_apellido,
      email: this.userFormUpdate.value.correo,
      usuario: this.userFormUpdate.value.correo,
      estado: parseInt(this.userFormUpdate.value.estado, 10) ,
      password:this.employees[this.userFormUpdate.value.id-1].password,
      codigopuntoasignado: codigopunto
    };
    console.log('ESTO SE VA AL UPDATE',user);
    this.servicios.updateUser(this.userFormUpdate.value.id, user).subscribe(res=>{
      console.log('RESPUESTA DE UPDATE', res);
      this.msg = 'Se actualizaron correctamente los Datos del Usuario de Punto de Atención';
      this.obtenerUsuarios();
    });
    let i = this.myValue;


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
  clean2(){
    this.userFormUpdate.patchValue({
      id: '',
      estado: '' ,
      correo : '',
      cargo : ''
      });
  }

  obtenerUsuarios() {
    this.servicios.getAllUsers().subscribe(resp => {
  /*     listaEstados: any[] = [];
      listaPuntos: any[] = [];
      listaCargos: any[] = []; */
      let nombreEstado;
      let nombrePunto;
      let nombreCargo;

      this.listaUsuarios = resp;
      this.employees=[];
      // tslint:disable-next-line: forin
      // tslint:disable-next-line: prefer-for-of
      //console.log('LOS USUARIOS OBTENIDOOOOS', resp);
      for (let i = 0; i < resp.length; i++) {
        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.listaEstados.length ; j++) {
         // console.log('ESTADOOO CUANDO SE ESTA CARGANDO EL USUARIO', this.listaEstados[j]);
            if(this.listaEstados[j].codigodato === this.listaUsuarios[i].estado){
              nombreEstado= this.listaEstados[j].nombre;
            }
        }
        // tslint:disable-next-line: prefer-for-of
        for (let k = 0; k < this.listaPuntos.length ; k++) {
           // console.log('ESTADOOO CUANDO SE ESTA CARGANDO EL USUARIO', this.listaPuntos[k]);
            if (this.listaPuntos[k].id === this.listaUsuarios[i].codigopuntoasignado) {
                nombrePunto = this.listaPuntos[k].nombre;
              }
          }
          // tslint:disable-next-line: prefer-for-of
        for (let l = 0; l < this.listaCargos.length ; l++) {
           // console.log('cargooooo', this.listaCargos[l]);
            if (this.listaCargos[l].codigodato === this.listaUsuarios[i].cargo) {
                nombreCargo = this.listaCargos[l].nombre;
              }
          }
        let user: Object = {
          id : resp[i].id,
           punto : this.listaUsuarios[i].codigopuntoasignado,
          //: nombrePunto,
          dpi : this.listaUsuarios[i].dpi,
          region :  this.listaUsuarios[i].region ,
          primer_nombre : this.listaUsuarios[i].primernombre,
          segundo_nombre:this.listaUsuarios[i].segundonombre,
          primer_apellido : this.listaUsuarios[i].primerapellido,
          segundo_apellido:this.listaUsuarios[i].segundoapellido,
          email : this.listaUsuarios[i].email,
          password : this.listaUsuarios[i].password,
          cargo: nombreCargo,
          /* cargo : this.listaUsuarios[i].cargo, */
          /* estado: this.listaUsuarios[i].estado */
          estado: nombreEstado
        };
        this.employees.push(user);

      }
     // this.employees.push(this.users);
    //  console.log('LO QUE SE GUARDA ES',this.listaTempUsers);

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
      //console.log(listatemp);
      this.listaPuntos = resp;
      // this.employees = resp;
    });
  }


}



