import { Component } from '@angular/core';
import { Equipo } from './interfaces/equipo';
import { EquiposService } from '../services/equipos.service';
import { Observable, of, mergeMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EquiposDialogComponent } from './components/equipos-dialog/equipos-dialog.component';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
})
export class EquiposComponent {
  n: number = 0;
  equipos$: Observable<Equipo[]>;

  constructor(
    private equiposService: EquiposService,
    private matDialog: MatDialog
  ) {
    // MOSTRAR CURSOS
    this.equipos$ = this.equiposService.getEquipos$();
  }

  //METODO AGREGAR CURSO
  addEquipo(): void {
    // Dialog
    this.matDialog
      .open(EquiposDialogComponent, {
        height: '420px',
        width: '700px',
      })
      .afterClosed()
      // suscripción
      .subscribe({
        next: (result) => {
          if (result) {
            this.equipos$ = this.equiposService.createEquipo$({
              id: 5 + this.n,
              nombre: result.nombre,
              division: result.division,
              liga: result.liga,
              pais: result.pais,
            });
            this.n++;
          }
        },
      });
  }

  // METODO BORRAR CURSO
  onDeleteEquipo(equipoId: number): void {
    this.equipos$ = this.equiposService.deleteEquipo$(equipoId);
  }

  // METODO EDITAR CURSO
  onEditEquipo(equipoId: number): void {
    // Dialog
    this.matDialog
      .open(EquiposDialogComponent, {
        data: equipoId,
        height: '420px',
        width: '700px',
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            this.equipos$ = this.equiposService.editEquipo$(equipoId, result);
          }
        },
      });
  }
}
