import { Injectable } from '@angular/core';
import { Jugador } from '../jugadores/models';

@Injectable({
  providedIn: 'root',
})
export class JugadoresService {
  constructor() {}

  getJugadores(): Jugador[] {
    return [
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
  }
}
