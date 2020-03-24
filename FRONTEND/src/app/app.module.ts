import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/* Routing */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
/* Angular material */
import { AngularMaterialModule } from './angular-material.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
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

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    AdminUserPaComponent,
    AdminPuntosAtencionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
    MatCardModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
