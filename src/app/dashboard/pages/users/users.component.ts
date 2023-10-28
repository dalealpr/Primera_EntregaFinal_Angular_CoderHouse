import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotifierService } from '../services/notifier.service';
import { UsersService } from '../services/users.service';
import { User } from './interfaces/users';
import { BehaviorSubject, Observable, of, mergeMap } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  n: number = 0;
  usuarios: Observable<User[]> = of([]);
  constructor(
    private matDialog: MatDialog,
    private userService: UsersService,
    private notifierService: NotifierService
  ) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(
        map((data: User[]) => {
          return data.map((usuario) => ({
            ...usuario,
            nombreCompleto: `${usuario.nombre} ${usuario.apellido}`,
          }));
        })
      )
      .subscribe((transformedData: User[]) => {
        this.usuarios = of(transformedData);
      });
  }

  //METODO CREAR USUARIO
  openUsersDialog(): void {
    const dialogRef = this.matDialog.open(UsersDialogComponent, {
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((dataForm: User) => {
      if (dataForm) {
        dataForm.id = 3 + this.n; // Asigna un nuevo ID, por ejemplo
        this.usuarios
          .pipe(
            mergeMap((usuarios: User[]) => {
              const updatedUsers = [...usuarios, dataForm]; // Agrega el nuevo usuario a la lista existente
              return of(updatedUsers); // Emite la lista actualizada como un Observable
            })
          )
          .subscribe((updatedUsers: User[]) => {
            this.usuarios = of(updatedUsers); // Actualiza la lista de usuarios en el componente
          });
      }
    });
    this.n++;
  }

  // METODO EDITAR USUARIO
  onEditUser(usuario: User): void {
    this.matDialog
      .open(UsersDialogComponent, {
        data: usuario,
        height: '512px',
        width: '700px',
      })
      .afterClosed()
      .subscribe((editDataForm: User) => {
        if (editDataForm) {
          this.usuarios
            .pipe(
              mergeMap((usuarios: User[]) => {
                const updatedUsers = usuarios.map((u) =>
                  u.id === usuario.id
                    ? { ...u, ...editDataForm, id: usuario.id }
                    : u
                );
                return of(updatedUsers);
              })
            )
            .subscribe((updatedUsuarios: User[]) => {
              this.usuarios = of(updatedUsuarios);
              console.log(updatedUsuarios);
            });
        }
      });
  }

  //METODO BORRAR USUARIO
  onDeleteUser(usuarioId: number): void {
    this.usuarios
      .pipe(
        map((usuarios: User[]) =>
          usuarios.filter((usuario) => usuario.id !== usuarioId)
        )
      )
      .subscribe((filteredUsuarios: User[]) => {
        this.usuarios = of(filteredUsuarios);
        this.notifierService.showSuccessNotif(
          'Usuario Borrado',
          `El usuario ha sido Borrado de la tabla`
        );
      });
  }
}
