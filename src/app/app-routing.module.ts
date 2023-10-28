import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './dashboard/pages/home/home.component';
import { JugadoresComponent } from './dashboard/pages/jugadores/jugadores.component';
import { JugadoresDetailComponent } from './dashboard/pages/jugadores/components/jugadores-detail/jugadores-detail.component';
import { UsersComponent } from './dashboard/pages/users/users.component';

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
