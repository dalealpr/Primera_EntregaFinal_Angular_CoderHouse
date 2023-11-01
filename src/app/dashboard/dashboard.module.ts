import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { ThemeSwitcherModule } from '../shared/components/theme-switcher/theme-switcher.module';
// Angular Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
// Ejemplo
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { JugadoresModule } from './pages/jugadores/jugadores.module';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { EquiposModule } from './pages/equipos/equipos.module';
import { UsersModule } from './pages/users/users.module';
import { EnrollmentsModule } from './pages/enrollments/enrollments.module';

@NgModule({
  declarations: [DashboardComponent, ToolbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatSidenavModule,
    ThemeSwitcherModule,
    JugadoresModule,
    MatListModule,
    SharedModule,
    RouterModule,
    HomeModule,
    EquiposModule,
    UsersModule,
    EnrollmentsModule,
  ],
  exports: [DashboardComponent],
})
export class DashboardModule {}
