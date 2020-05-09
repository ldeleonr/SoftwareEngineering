import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import {AdminUserPaComponent} from './components/admin-user-pa/admin-user-pa.component';
import {AdminPuntosAtencionComponent} from './components/admin-puntos-atencion/admin-puntos-atencion.component';
import {TiposQuejasComponent} from './components/tipos-quejas/tipos-quejas.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'admin-users-pa' },
  { path: 'login', component: LogInComponent },
  {path : 'usuarios-puntos-atencion', component: AdminUserPaComponent},
  {path: 'admin-puntos-atencion', component: AdminPuntosAtencionComponent},
  {path: 'admin-tipos-quejas', component: TiposQuejasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
