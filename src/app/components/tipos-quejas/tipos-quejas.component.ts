import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';


@Component({
  selector: 'app-tipos-quejas',
  templateUrl: './tipos-quejas.component.html',
  styleUrls: ['./tipos-quejas.component.css']
})
export class TiposQuejasComponent implements OnInit {

  //VARIABLES Y OBJETOS
  nameAPP = 'Tipos de Quejas';
  principalForm: FormGroup;
  updateForm: FormGroup;
  principalModel: any = {};
  tableModel = [];
  listaTiposQuejas: any[] = [];
  listaEstados: any[] = [];


  constructor(
    private servicios: Servicios,
    private fb: FormBuilder,
    private formBuild: FormBuilder
  ) {
    //FORMGROUP PARA MANEJO PRINCIPAL
    this.principalForm = this.formBuild.group({
      siglas: ['' , [Validators.required]],
      descripcion: ['' , [Validators.required]],
      estado:['' , [Validators.required]]
    });
    //FORMGROUP PARA MANEJO EN MODAL DE UPDATE
    this.updateForm = this.fb.group({
      descripcion:[''],
      estado: ['' ],
      id:[''],
      queja:[''],
    });
   }
   pageActual: number = 1;
    msg = '';
    err = '';
    hideUpdate = true;



  onSubmit() {

  }

  ngOnInit(): void {
    this.obtenerTiposQuejas();
    this.obtenerEstado(1);
  }

  saveQueja(){
    let date: Date = new Date();
    const anio = date.getFullYear().toString();
    console.log(this.principalForm.value);
    this.principalModel.id = this.tableModel.length + 1;
    this.principalModel.siglas = this.principalForm.value.siglas;
    this.principalModel.descripcion = this.principalForm.value.descripcion;
    this.principalModel.estado = this.principalForm.value.estado;
    this.principalModel.anio = anio;
    console.log(this.listaTiposQuejas);
    let siglasRepetidas='false';
    for(let i=0; i<this.listaTiposQuejas.length;i++){
      if(this.listaTiposQuejas[i].siglas === this.principalModel.siglas){
        console.log('EXISTEN SIGLAS IGUALES');
        siglasRepetidas='true';
      }
    }
    if(siglasRepetidas==='false'){
      this.servicios.addTipoQueja(this.principalModel).subscribe(res=>{
        console.log('RESPUESTA GUARDAR POST',res);
        this.msg='Sus datos han sido almacenados exitosamente';
        this.obtenerTiposQuejas();
      });
    }
    else{
      this.err='No puede Ingresar Siglas Repetidas, por favor verifique los datos ingresados';
      this.cleanSigla();
    }
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
      this.tableModel=[];
      console.log('LISTA DE TIPOS DE QUEJAS',this.listaTiposQuejas);
      for(let element of this.listaTiposQuejas){
        //element.descEstado='ACTIVO';

          if(element.estado.toString()==='1'){
            element.descEstado='ACTIVO';
          }
          else if(element.estado.toString()==='2'){
            element.descEstado='INACTIVO';
          }
        console.log('ELEMEEENT ',element);
        this.tableModel.push(element);
      }
      console.log('mapping',this.tableModel);
    });
  }

  closeAlert():void {
    this.msg = '';
    this.err='';

  }

  updateTipoQueja(){
    console.log('ESTO LLEGA AL METODO UPDATE TIPO QUEJA',this.updateForm.value);
    let queja:any;
    for(let element of this.listaTiposQuejas){
      if(element.id===this.updateForm.value.id[0]){
        console.log('QUEJA ORIGINAL A MODIFICAR',element);
        queja=element;
      }
    }
    queja.descripcion=this.updateForm.value.descripcion;
    queja.estado=this.updateForm.value.estado;
    console.log('queja a modificar lista para actualizar',queja);
    this.servicios.updateTipoQueja(queja.id,queja).subscribe(res=>{
      console.log(res);
      this.msg = 'Datos Actualizados';
      this.obtenerTiposQuejas();
    });
    this.clean();
  }

  editTipoQueja(i):void {
    console.log('ID LA QUEJA A MODIFICAR',i);
    for(let element of this.listaTiposQuejas){
      if(element.id===i){
        console.log('ESTA ES LA QUEJA A MODIFICAR',element);
        this.updateForm.patchValue({
          descripcion:[element.descripcion],
          estado: [element.estado],
          queja:[element.siglas+'-'+element.id+'-'+element.anio],
          id:[element.id]
          });
      }
    }
  }

  deleteTipoQueja(i):void {}

  myValue;

  clean(){
    this.updateForm.patchValue({
      id:[' '],
      queja:[' '],
      descripcion:[' '],
      estado: [' ']
      });
  }

  cleanSigla(){
    this.principalForm.patchValue({
      siglas:[' ']
      });
  }



}



