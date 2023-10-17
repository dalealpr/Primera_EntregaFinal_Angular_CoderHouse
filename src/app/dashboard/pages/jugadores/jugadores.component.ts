import { Component } from '@angular/core';
import { Jugador } from './models';
import { MatDialog } from '@angular/material/dialog';
import { JugadoresDialogComponent } from './components/jugadores-dialog/jugadores-dialog.component';

@Component({
  selector: 'app-jugadores',
  templateUrl: './jugadores.component.html',
  styleUrls: ['./jugadores.component.scss'],
})
export class JugadoresComponent {
  n: number = 0;
  jugadores: Jugador[] = [
    {
      id: 1001,
      nombre: 'Lionel',
      apellido: 'Messi',
      edad: 36,
      nacionalidad: 'Argentino',
      equipo: 'Inter Miami CF',
      posicion: 'Delantero',
    },
    {
      id: 1002,
      nombre: 'Cristiano Ronaldo',
      apellido: 'dos Santos',
      edad: 38,
      nacionalidad: 'Portugues',
      equipo: 'Al-Nassr',
      posicion: 'Delantero',
    },
    {
      id: 1003,
      nombre: 'Kylian',
      apellido: 'Mbappé',
      edad: 24,
      nacionalidad: 'Frances',
      equipo: 'París Saint-Germain',
      posicion: 'Delantero',
    },
    {
      id: 1004,
      nombre: 'Erling',
      apellido: 'Haaland',
      edad: 21,
      nacionalidad: 'Noruego',
      equipo: 'Manchester City',
      posicion: 'Delantero',
    },
    {
      id: 1005,
      nombre: 'Neymar',
      apellido: 'Santos ',
      edad: 31,
      nacionalidad: 'Brasileño',
      equipo: 'Al-Hilal FC',
      posicion: 'Delantero',
    },
  ];

  constructor(private matDialog: MatDialog) {}

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
          if (!!dataForm) {
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
          if (!!editDataForm) {
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
  }
}
