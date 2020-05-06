import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';


@Component({
  selector: 'app-tipos-quejas',
  templateUrl: './tipos-quejas.component.html',
  styleUrls: ['./tipos-quejas.component.css']
})
export class TiposQuejasComponent implements OnInit {

  nameAPP = 'Tipos de Quejas';
  principalForm: FormGroup;
  principalModel: any = {};
  tableModel = [];
  listaTiposQuejas: any[] = [];
  listaEstados: any[] = [];

//-------------------
  listaRegiones: any[] = [];
  listaPuntos: any[] = [];
  listaCargos: any[] = [];
  listaUsuarios: any[] = [];
  listaTempUsers: any[] = [];
  title = 'Angular Crud';
  region = new FormControl('');
  estadoUpdate = new FormControl('');
  userForm: FormGroup;
  userFormUpdate: FormGroup;
////-------------------

  constructor(
    private servicios: Servicios,
    private fb: FormBuilder,
    private formBuild: FormBuilder
  ) {
    this.principalForm = this.formBuild.group({
      siglas: ['' , [Validators.required]],
      descripcion: ['' , [Validators.required]],
      estado:['' , [Validators.required]]
    });



    this.userFormUpdate = this.fb.group({
      id:[''],
      anio: ['' ],
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



  onSubmit() {

  }

  ngOnInit(): void {
    this.obtenerTiposQuejas();
    this.obtenerEstado(1);



    //this.obtenerRegion(3);
    //this.obtenerCargos(5);
   // this.obtenerPuntosAtencion();
   // this.obtenerUsuarios();

  }

  saveQueja(){
    let date: Date = new Date();
    const anio = date.getFullYear().toString();
    console.log(this.principalForm.value);
    this.principalModel.id = this.tableModel.length + 1;
    this.principalModel.siglas = this.principalForm.value.siglas;
    this.principalModel.descripcion = this.principalForm.value.descripcion;
    // this.principalModel.estado = this.principalForm.value.estado;
    this.principalModel.anio = anio;
    this.servicios.addTipoQueja(this.principalModel).subscribe(res=>{
      console.log('RESPUESTA GUARDAR POST',res);
      this.obtenerTiposQuejas();
    });

    //this.tableModel.push(this.principalModel);
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

  obtenerTiposQuejas(){
    this.servicios.getAllTipoQuejas().subscribe(res =>{
      this.listaTiposQuejas = res;
      console.log('LISTA DE TIPOS DE QUEJAS',this.listaTiposQuejas);
      for(let element of this.listaTiposQuejas){
        console.log('ELEMEEENT ',element);
        this.tableModel.push(element);
      }
      console.log('mapping',this.tableModel);
    });
  }

  closeAlert():void {
    this.msg = '';
  }

  updateTipoQueja(){}

  editTipoQueja(i):void {}

  deleteTipoQueja(i):void {}

  myValue;

  clean2(){
    this.userFormUpdate.patchValue({
      id: '',
      estado: '' ,
      correo : '',
      cargo : ''
      });
  }



}



