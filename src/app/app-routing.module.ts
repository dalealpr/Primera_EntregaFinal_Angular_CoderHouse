import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { JugadoresComponent } from './dashboard/pages/jugadores/jugadores.component';
import { JugadoresDetailComponent } from './dashboard/pages/jugadores/components/jugadores-detail/jugadores-detail.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { UsersDetailComponent } from './dashboard/pages/users/components/users-detail/users-detail.component';
import { EquiposComponent } from './dashboard/pages/equipos/equipos.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'jugadores',
        component: JugadoresComponent,
      },
      // Ruta dinamica Detalle Jugador
      {
        path: 'jugadores/detail/:id',
        component: JugadoresDetailComponent,
      },
      {
        path: 'usuarios',
        component: UsersComponent,
      },
      // Ruta dinamica Detalle Usuario
      {
        path: 'usuarios/detail/:id',
        component: UsersDetailComponent,
      },
      {
        path: 'equipos',
        component: EquiposComponent,
      },
    ],
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    component: AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
