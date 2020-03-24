import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import {AdminUserPaComponent} from './components/admin-user-pa/admin-user-pa.component';
import {AdminPuntosAtencionComponent} from './components/admin-puntos-atencion/admin-puntos-atencion.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin-users-pa' },
  { path: 'login', component: LogInComponent },
  {path : 'admin-users-pa', component: AdminUserPaComponent},
  {path: 'admin-puntos-atencion', component: AdminPuntosAtencionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
