import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../users/interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  getUsers(): Observable<User[]> {
    const usuarios: User[] = [
      {
        id: 1,
        nombre: 'David',
        apellido: 'Leal',
        email: 'david@mail.com',
      },
      {
        id: 2,
        nombre: 'Juan',
        apellido: 'Perez',
        email: 'juan@mail.com',
      },
      {
        id: 3,
        nombre: 'Pedro',
        apellido: 'Ramirez',
        email: 'pedro@mail.com',
      },
    ];

    return of(usuarios);
  }
}
