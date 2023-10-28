import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../interfaces/users';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input()
  dataSource: User[] = [];

  @Output()
  deleteUser = new EventEmitter<number>();

  @Output()
  editUser = new EventEmitter<User>();

  displayedColumns = ['Id', 'Nombres', 'Email', 'Actions'];
}
