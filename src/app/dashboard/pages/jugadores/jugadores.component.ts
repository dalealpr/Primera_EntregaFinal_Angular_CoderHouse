import { Component } from '@angular/core';
import { Jugador } from './models';
import { MatDialog } from '@angular/material/dialog';
import { JugadoresDialogComponent } from './components/jugadores-dialog/jugadores-dialog.component';
import { JugadoresService } from '../services/jugadores.service';
import { NotifierService } from '../services/notifier.service';


@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  n: number = 0;
  jugadores: Jugador[] = []

  constructor(
    private matDialog: MatDialog, 
    private jugadoresService:JugadoresService,
    private notifierService: NotifierService
    ) {
      this.jugadores = this.jugadoresService.getJugadores();
    }

  // Metodo Dialog
  openUsersDialog(): void {
    this.matDialog
      .open(JugadoresDialogComponent, { height: '512px', width: '700px' })
      //Cuando el modal se cierra
      .afterClosed()
      //subscripcion
      .subscribe({
        //cuando se cierra ejecuta el next
        next: (dataForm) => {
          // si existe dataForm y es !=null
          if (!dataForm) {
            //se genera un nuevo array con:
            this.jugadores = [
              //copia del array anterior mas:
              ...this.jugadores,
              // objeto con los dataForm
              {
                ...dataForm,
                id: 1005 + this.n,
              },
            ];
          }
        },
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
      .subscribe({
        next: (editDataForm) => {
          if (!editDataForm) {
            this.jugadores = this.jugadores.map((value) =>
              value.id === jugador.id ? { ...value, ...editDataForm } : value
            );
          }
        },
      });
  }

  //METODO BORRAR JUGADOR
  onDeletePlayer(jugadorId: number): void {
    //fitro por jugador del array jugadores
    this.jugadores = this.jugadores.filter(
      //dejo solo los jugadores que tengan un id distinto al id asociado al click delete
      (jugador) => jugador.id !== jugadorId
    );
    this.notifierService.showSuccessNotif('Jugador Borrado', `El jugador ha sido Borrado de la tabla`)
  }
}
