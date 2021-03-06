import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';
import * as moment from 'moment';
import { _MatTabHeaderMixinBase } from '@angular/material/tabs/typings/tab-header';

@Component({
  selector: 'app-asign-queja-mal-servicio',
  templateUrl: './asign-queja-mal-servicio.component.html',
  styleUrls: ['./asign-queja-mal-servicio.component.css']
})
export class AsignQuejaMalServicioComponent  implements OnInit {

  //VARIABLES Y OBJETOS
  nameAPP = 'Ingreso de Quejas por Usuario';
  numeroQueja='';
  principalForm: FormGroup;
  updateForm: FormGroup;
  principalModel: any = {};
  tableModel = [];
  fichaModel=[];
  listaTiposQuejas: any[] = [];
  listaEstados: any[] = [];
  listaUsuarioByPa:any[];


  listaMediosIngreso: any[] = [];
  listaPuntosAtencion : any[] = [];
  listaUsuarios: any[] = [];
  listaQuejas: any[] = [];

  constructor(
    private servicios: Servicios,
    private fb: FormBuilder,
    private formBuild: FormBuilder
  ) {
    //FORMGROUP PARA MANEJO PRINCIPAL
    this.principalForm = this.formBuild.group({
      medioingreso:  ['' , [Validators.required]],
      nombre:['' , [Validators.required]],
      correo:['' , [Validators.required]],
      telefono:['' , [Validators.required]],
      agencia:['' , [Validators.required]],
      usuario:['' , [Validators.required]],
      detalle:['' , [Validators.required]]
      //----------------------

    });
    //FORMGROUP PARA MANEJO EN MODAL DE UPDATE
    this.updateForm = this.fb.group({
      descripcion:[''],
      estado: ['' ],
      id:[''],
      queja:[''],
      puntoatencion:[''],
      usuario:['']
    });
   }
   pageActual: number = 1;
    msg = '';
    err = '';
    hideUpdate = true;



  onSubmit() {

  }

  ngOnInit(): void {
   // this.obtenerTiposQuejas();


    this.obtenerEstado(1);
    this.obtenerMedioIngreso(6);
    this.obtenerPuntosAtencion();
    this.obtenerUsuarios();
    this.obtenerQuejasUsuarios();
  }
  /*
  medioingreso:  ['' , [Validators.required]],
  nombre:['' , [Validators.required]],
  correo:['' , [Validators.required]],
  telefono:['' , [Validators.required]],
  agencia:['' , [Validators.required]],
  usuario:['' , [Validators.required]],
  detalle:['' , [Validators.required]] */


  saveQueja(){

    let date: Date = new Date();
    const anio = date.getFullYear().toString();
    const correlativo= this.tableModel.length+1;
    this.numeroQueja='QMS-'+ correlativo+ '-'+ anio;
    console.log('ESTE ES EL FORM:','this.principalForm.value.correo');
    console.log('CORREO:',this.principalForm.value.correo);
   this.principalModel.id = this.tableModel.length + 1;
   this.principalModel.codigotipoqueja = 1;
   this.principalModel.detallequeja = this.principalForm.value.detalle;
   this.principalModel.fechaatencion =null;
   this.principalModel.fechaingreso = date;
   this.principalModel.fechamodifico=null;
   this.principalModel.medioingreso= this.principalForm.value.medioingreso;
   this.principalModel.usuarioingreso=this.principalForm.value.usuario;
   this.principalModel.usuarioingreso=this.principalForm.value.nombre;
   this.principalModel.usuariomodifico=null;
   this.principalModel.estado=1;
   this.principalModel.puntoasignado=this.principalForm.value.agencia;
   this.principalModel.correo=this.principalForm.value.correo;
   this.principalModel.telefono= this.principalForm.value.telefono;
   this.principalModel.estadointerno= 45;
   this.principalModel.estadoexterno= 44;
  /*   this.principalModel.siglas = this.principalForm.value.siglas;
    this.principalModel.descripcion = this.principalForm.value.descripcion;
    this.principalModel.estado = this.principalForm.value.estado;
    this.principalModel.anio = anio; */

    console.log(this.principalModel);
    this.servicios.addQueja(this.principalModel).subscribe(resp=>{
      console.log('QUEJAS', resp);
      this.msg='Queja ingresada exitosamente';
      this.obtenerQuejasUsuarios();
    });
    /* let siglasRepetidas='false'; */
    /* for(let i=0; i<this.listaTiposQuejas.length;i++){
      if(this.listaTiposQuejas[i].siglas === this.principalModel.siglas){
        console.log('EXISTEN SIGLAS IGUALES');
        siglasRepetidas='true';
      }
    }
    if(siglasRepetidas==='false'){
      this.servicios.addTipoQueja(this.principalModel).subscribe(res=>{
        console.log('RESPUESTA GUARDAR POST',res);
        this.obtenerTiposQuejas();
      });
    }
    else{
      this.err='No puede Ingresar Siglas Repetidas, por favor verifique los datos ingresados';
      this.cleanSigla();
    } */
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

  obtenerMedioIngreso(codigo: any){
    this.servicios.getdatoByDatoPadre(codigo).subscribe(res =>{
     this.listaMediosIngreso = res;
     console.log(res);
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


  verQueja(i):void {
    console.log('ID LA QUEJA A atender',i);
    this.fichaModel=[];
    for(let element of this.listaQuejas){
      if(element.id===i){
        console.log('ESTA ES LA QUEJA A VER',element);
        for(let mi of this.listaMediosIngreso){
          if(mi.codigodato==element.medioingreso){
            element.medioingreso=mi.nombre;
          }

        }
        for(let pa of this.listaPuntosAtencion){
          if(pa.id==element.puntoasignado){
            element.puntoasignado=pa.nombre;

          }
        }
        this.fichaModel.push(element);
      }
    }
  }

  asignarQueja(i):void {
    console.log('ID LA QUEJA A atender',i);
    this.fichaModel=[];
    for(let element of this.listaQuejas){
      if(element.id===i){
        for(let mi of this.listaMediosIngreso){
          if(mi.codigodato==element.medioingreso){
            element.medioingreso=mi.nombre;

          }
        }
        for(let pa of this.listaPuntosAtencion){
          if(pa.id==element.puntoasignado){
            element.puntoasignado=pa.nombre;

          }
        }
        this.fichaModel.push(element);
      }
      this.clean();
    }


    for(let element of this.listaQuejas){
      if(element.id===i){
        console.log('ESTA ES LA QUEJA A ASIGNAR',element);
        this.updateForm.patchValue({
          descripcion:[element.descripcion],
          estado: [element.estado],
          queja:[element.siglas+'-'+element.id+'-'+element.anio],
          id:[element.id]
          });
      }
    }
  }

  asignarUsuarioQueja(){
    console.log('ESTO LLEGA AL METOO DE ASIGNAR USUARIO QUEJA',this.updateForm.value);
    this.clean();
  }

  rechazarQueja(i):void {
    console.log('ID LA QUEJA A atender',i);

    for(let element of this.listaQuejas){
      if(element.id===i){
        console.log('ESTA ES LA QUEJA A RECHAZAR',element);
        this.updateForm.patchValue({
          descripcion:[element.descripcion],
          estado: [element.estado],
          queja:[element.siglas+'-'+element.id+'-'+element.anio],
          id:[element.id]
          });
      }
    }
  }

  ingresarDetalleQueja(i):void {
    console.log('ID LA QUEJA A atender',i);

    for(let element of this.listaQuejas){
      if(element.id===i){
        console.log('ESTA ES LA QUEJA A ATENDER',element);
        this.updateForm.patchValue({
          descripcion:[element.descripcion],
          estado: [element.estado],
          queja:[element.siglas+'-'+element.id+'-'+element.anio],
          id:[element.id]
          });
      }
    }
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
      this.listaPuntosAtencion = listatemp;
      console.log('AGENCIAS ',this.listaPuntosAtencion);
    });
  }

  deleteTipoQueja(i):void {}

  myValue;

  clean(){
    this.updateForm.patchValue({
      id:[' '],
      queja:[' '],
      descripcion:[' '],
      estado: [' '],
      puntoatencion:[''],
      usuario:['']
      });
  }

  cleanSigla(){
    this.principalForm.patchValue({
      siglas:[' ']
      });
  }

  obtenerUsuarios() {
    this.servicios.getAllUsers().subscribe(resp => {
      console.log('lista usuarios',resp);
      this.listaUsuarios = resp;
    });
  }

  obtenerQuejasUsuarios(){
    this.servicios.getAllQuejas().subscribe(res=>{
      this.listaQuejas=res;
      this.tableModel=[];
      for(let element of this.listaQuejas){
        console.log('ELEMEEENT ',element);
        if (element.estadoexterno===44 && element.estadointerno===45){
          element.estadoexterno='Presentada';
          element.estadointerno='Presentada';
          element.fechaingreso=moment(element.fechaingreso).format("DD/MM/YYYY");
          this.tableModel.push(element);
        }
        if(element.estado.toString()==='1'){
          element.estado='ACTIVO';
        }
        else if(element.estado.toString()==='2'){
          element.estado='INACTIVO';
        }
        for(let mi of this.listaMediosIngreso){
          if(mi.codigodato==element.medioingreso){
            element.medioingreso=mi.nombre;

          }
        }

      }
      console.log('mapping',this.tableModel);
      console.log('TODAS LAS QUEJAS',res);
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
  onChange(i) {
    console.log('EN SELEEECT',i); // Aquí iría tu lógica al momento de seleccionar algo
    this.obtenerUsuariosByPa(i);

}


obtenerUsuariosByPa(i) {
  this.servicios.getAllUsers().subscribe(resp => {
    console.log('lista usuarios',resp);
    let tablePA=[];
    let j=0;
    for(let element of this.listaUsuarios){
      if(element.codigopuntoasignado==i){

        tablePA.push(element);

      }
    }
    this.listaUsuarioByPa=tablePA;
    console.log('lista filtrada',tablePA);
  });
}



  }


