import { Component } from '@angular/core';
import { Jugador } from './models';
import { MatDialog } from '@angular/material/dialog';

import { JugadoresService } from '../services/jugadores.service';
import { NotifierService } from '../services/notifier.service';
import { Observable, of, mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { JugadoresDialogComponent } from './components/jugadores-dialog/jugadores-dialog.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  n: number = 0;
  jugadores: Observable<Jugador[]> = of([]);

  constructor(
    private matDialog: MatDialog,
    private jugadoresService: JugadoresService,
    private notifierService: NotifierService
  ) {}
  ngOnInit() {
    this.jugadoresService
      .getJugadores()
      .pipe(
        map((data: Jugador[]) => {
          return data.map((jugador) => ({
            ...jugador,
            nombreCompleto: `${jugador.nombre} ${jugador.apellido}`,
          }));
        })
      )
      .subscribe((transformedData: Jugador[]) => {
        this.jugadores = of(transformedData);
      });
  }

  //Metodo Dialog
  openUsersDialog(): void {
    const dialogRef = this.matDialog.open(JugadoresDialogComponent, {
      height: '512px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((dataForm: Jugador) => {
      if (dataForm) {
        dataForm.id = 3 + this.n; // Asigna un nuevo ID, por ejemplo
        this.jugadores
          .pipe(
            mergeMap((jugadores: Jugador[]) => {
              const updatedUsers = [...jugadores, dataForm]; // Agrega el nuevo usuario a la lista existente
              return of(updatedUsers); // Emite la lista actualizada como un Observable
            })
          )
          .subscribe((updatedUsers: Jugador[]) => {
            this.jugadores = of(updatedUsers); // Actualiza la lista de usuarios en el componente
          });
      }
    });
    this.n++;
  }

  // METODO EDITAR JUGADOR
  onEditUser(jugador: Jugador): void {
    this.matDialog
      .open(JugadoresDialogComponent, {
        data: jugador,
        height: '512px',
        width: '700px',
      })
      .afterClosed()
      .subscribe((editDataForm: Jugador) => {
        if (editDataForm) {
          // Actualiza el jugador en la lista
          this.jugadoresService
            .getJugadores()
            .pipe(
              map((jugadores: Jugador[]) => {
                // Encuentra y actualiza el jugador en la lista
                jugadores.forEach((j, index) => {
                  if (j.id === jugador.id) {
                    jugadores[index] = editDataForm;
                  }
                });
                return jugadores;
              })
            )
            .subscribe((updatedJugadores: Jugador[]) => {
              this.jugadores = of(updatedJugadores);
              console.log(updatedJugadores);
            });
        }
      });
  }

  //METODO BORRAR JUGADOR
  onDeletePlayer(jugadorId: number): void {
    this.jugadores
      .pipe(
        map((jugadores: Jugador[]) =>
          jugadores.filter((jugador) => jugador.id !== jugadorId)
        )
      )
      .subscribe((filteredJugadores: Jugador[]) => {
        this.jugadores = of(filteredJugadores);
        this.notifierService.showSuccessNotif(
          'Jugador Borrado',
          `El jugador ha sido Borrado de la tabla`
        );
      });
  }
}
