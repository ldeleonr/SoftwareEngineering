import { Component, ElementRef, OnDestroy, OnInit ,ViewChild} from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Servicios } from '../../servicios/servicios.service';
import * as moment from 'moment';


@Component({
  selector: 'app-ingreso-queja-contribuyente',
  templateUrl: './ingreso-queja-contribuyente.component.html',
  styleUrls: ['./ingreso-queja-contribuyente.component.css']
})
export class IngresoQuejaContribuyenteComponent implements OnInit {
  @ViewChild('closebutton') closebutton;
  @ViewChild('labelImport')
  labelImport: ElementRef;

  //VARIABLES Y OBJETOS
  nameAPP = 'Quejas y Denuncias/Ingreso de queja por mal servicio o servicio no conforme';
  numeroQueja='';
  alertaQueja='';
  alertaCuentahabiente='';
  principalForm: FormGroup;
  updateForm: FormGroup;
  recaptchaReactive:FormControl
  principalModel: any = {};
  tableModel = [];
  listaTiposQuejas: any[] = [];
  listaEstados: any[] = [];

  formImport: FormGroup;
  fileToUpload: File = null;



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
      medioingreso:  [''],
      nombre:['' , [Validators.required]],
      correo:['' , [Validators.required]],
      telefono:['' , [Validators.required]],
      agencia:[''],
      usuario:['' ],
      detalle:['' , [Validators.required]]
      //----------------------

    });
    //FORMGROUP PARA MANEJO EN MODAL DE UPDATE
    this.updateForm = this.fb.group({
      descripcion:[''],
      estado: ['' ],
      id:[''],
      queja:[''],
    });

    this.formImport = new FormGroup({
      importFile: new FormControl('', Validators.required)
    });
   }
   pageActual: number = 1;
    msg = '';
    err = '';
    hideUpdate = true;

    onFileChange(files: FileList) {
      this.labelImport.nativeElement.innerText = Array.from(files)
        .map(f => f.name)
        .join(', ');
      this.fileToUpload = files.item(0);
    }

    import(): void {
      console.log('import ' + this.fileToUpload.name);
    }

  onSubmit() {

  }

  public resolved(captchaResponse: string) {
    this.closebutton.nativeElement.click();
    console.log(`Resolved response token: ${captchaResponse}`);

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

  verificarQueja(){
    if (this.principalForm.valid)
    {
      console.log('FORMULARIO VALIDO');
      this.saveQueja();
      this.cleanPrincipal();
    }
    else{
      console.log('FORMULARIO INVALIDO');
      this.alertaQueja='La queja no puede ser guardada verifique que ha completado todos los campos requeridos';
    }
  }

  saveQueja(){

    let date: Date = new Date();
    const anio = date.getFullYear().toString();
    const correlativo= this.tableModel.length-1;
    console.log('EN EL LISTADO DE QUEJAS ESTO RETORNA ', this.listaQuejas[correlativo].id+1    );
    const numeroQueja=Number(this.listaQuejas[correlativo].id)+1;
    this.numeroQueja='QMS-'+ numeroQueja + '-'+ anio;
    // tslint:disable-next-line: max-line-length
    this.alertaQueja='¡Ingresada exitosamente a travez de la aplicación movil!';
    this.alertaCuentahabiente ='Señor cuentahabiente,  agradecemos su comunicación,  le informamos que su queja ha sido recibida exitosamente. Para el seguimiento o cualquier consulta relacionada, no olvide que el número de su queja es '+ this.numeroQueja;
    console.log('ESTE ES EL FORM:','this.principalForm.value.correo');
    console.log('CORREO:',this.principalForm.value.correo);
   this.principalModel.id = this.tableModel.length + 1;
   this.principalModel.codigotipoqueja = 1;
   this.principalModel.detallequeja = this.principalForm.value.detalle;
   this.principalModel.fechaatencion =null;
   this.principalModel.fechaingreso = date;
   this.principalModel.fechamodifico=null;
   this.principalModel.medioingreso= 46;
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
      estado: [' ']
      });
  }

  cleanSigla(){
    this.principalForm.patchValue({
      siglas:[' ']
      });
  }

  cleanPrincipal(){
    this.principalForm.patchValue({
      nombre:[' '],
      correo:[' '],
      telefono:[' '],
      agencia: [' '],
      usuario:[' ' ],
      detalle:[' ']
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


  }


