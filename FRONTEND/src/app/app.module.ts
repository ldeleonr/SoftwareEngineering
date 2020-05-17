import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* CAPTCHA */
import  {  RecaptchaModule ,  RecaptchaFormsModule  }  from  'ng-recaptcha' ;
/* Angular material */
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
// componentes
import { LogInComponent } from './components/log-in/log-in.component';
import { AdminUserPaComponent } from './components/admin-user-pa/admin-user-pa.component';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MAT_DATE_LOCALE,
  DateAdapter,
  MAT_DATE_FORMATS,
  MatFormFieldModule,
  MatPaginatorIntl
} from '@angular/material';

import { AdminPuntosAtencionComponent } from './components/admin-puntos-atencion/admin-puntos-atencion.component';
import { TiposQuejasComponent } from './components/tipos-quejas/tipos-quejas.component';
import { IngresoQuejaUsuarioComponent } from './components/ingreso-queja-usuario/ingreso-queja-usuario.component';
import { IngresoQuejaContribuyenteComponent } from './components/ingreso-queja-contribuyente/ingreso-queja-contribuyente.component';
import { AsignQuejaMalServicioComponent } from './components/asign-queja-mal-servicio/asign-queja-mal-servicio.component';
import { SeguimientoCentralizadorComponent } from './components/seguimiento-centralizador/seguimiento-centralizador.component';
import { SeguimientoPuntosAtencionComponent } from './components/seguimiento-puntos-atencion/seguimiento-puntos-atencion.component';
import { AutoConsultaContribuyenteComponent } from './components/auto-consulta-contribuyente/auto-consulta-contribuyente.component';
import { ReporteUnidadAdministrativaComponent } from './components/reporte-unidad-administrativa/reporte-unidad-administrativa.component';
import { from } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuAppComponent } from './components/menu-app/menu-app.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdminUserPaComponent,
    AdminPuntosAtencionComponent,
    TiposQuejasComponent,
    IngresoQuejaUsuarioComponent,
    IngresoQuejaContribuyenteComponent,
    AsignQuejaMalServicioComponent,
    SeguimientoCentralizadorComponent,
    SeguimientoPuntosAtencionComponent,
    AutoConsultaContribuyenteComponent,
    ReporteUnidadAdministrativaComponent,
    MenuAppComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatCardModule,
    RecaptchaModule ,   // este es el módulo principal recaptcha
    RecaptchaFormsModule ,  // este es el módulo para la validación de formularios en caso de formulario
    MatInputModule, NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
