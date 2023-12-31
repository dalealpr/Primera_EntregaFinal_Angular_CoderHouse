import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { UsersDetailComponent } from './components/users-detail/users-detail.component';

@NgModule({
  declarations: [
    UsersComponent,
    UsersTableComponent,
    UsersDialogComponent,
    UsersDetailComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
