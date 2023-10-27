import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Jugador } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jugadores-table',
  templateUrl: './jugadores-table.component.html',
  styleUrls: ['./jugadores-table.component.scss'],
})
export class JugadoresTableComponent {
  @Input()
  dataSource: Jugador[] = [];

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<Jugador>();

  displayedColumns = [
    'Nombre y Apellido',
    'Edad',
    'Nacionalidad',
    'Equipo',
    'Posicion',
    'Actions',
  ];

  constructor(private router: Router) {}

  // Metodo Ruta Dinamica (detalle Jugador)
  goToDetail(userId: number): void {
    this.router.navigate(['dashboard', 'jugadores', 'detail', userId], {
      // Query params
      queryParams: {
        search: 'hola mundo',
      },
    });
  }
}
