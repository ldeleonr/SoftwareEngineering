import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import {AdminUserPaComponent} from './components/admin-user-pa/admin-user-pa.component';
import {AdminPuntosAtencionComponent} from './components/admin-puntos-atencion/admin-puntos-atencion.component';
import {TiposQuejasComponent} from './components/tipos-quejas/tipos-quejas.component';
import {IngresoQuejaUsuarioComponent} from './components/ingreso-queja-usuario/ingreso-queja-usuario.component';
import { IngresoQuejaContribuyenteComponent } from './components/ingreso-queja-contribuyente/ingreso-queja-contribuyente.component';
import { MenuAppComponent } from './components/menu-app/menu-app.component';
import { AsignQuejaMalServicioComponent } from './components/asign-queja-mal-servicio/asign-queja-mal-servicio.component';
import { ReporteUnidadAdministrativaComponent } from './components/reporte-unidad-administrativa/reporte-unidad-administrativa.component';
import { SeguimientoCentralizadorComponent } from './components/seguimiento-centralizador/seguimiento-centralizador.component';
import { SeguimientoPuntosAtencionComponent } from './components/seguimiento-puntos-atencion/seguimiento-puntos-atencion.component';
import { AutoConsultaContribuyenteComponent } from './components/auto-consulta-contribuyente/auto-consulta-contribuyente.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/menu-banco' },
  {path: 'menu-banco', component: MenuAppComponent},
  { path: 'login', component: LogInComponent },
  {path : 'usuarios-puntos-atencion', component: AdminUserPaComponent},
  {path: 'admin-puntos-atencion', component: AdminPuntosAtencionComponent},
  {path: 'admin-tipos-quejas', component: TiposQuejasComponent},
  {path: 'ingreso-queja-usuario', component: IngresoQuejaUsuarioComponent},
  {path: 'ingreso-queja-contribuyente', component: IngresoQuejaContribuyenteComponent},
  {path: 'asignacion-queja-mal-servicio', component: AsignQuejaMalServicioComponent},
  {path: 'reporte-unidad-administrativa', component: ReporteUnidadAdministrativaComponent},
  {path: 'seguimiento-centralizador', component: SeguimientoCentralizadorComponent},
  {path: 'seguimiento-puntos-atencion', component: SeguimientoPuntosAtencionComponent},
  {path: 'auto-consulta-contribuyente', component: AutoConsultaContribuyenteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
