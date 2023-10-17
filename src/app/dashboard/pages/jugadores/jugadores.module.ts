import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JugadoresTableComponent } from './components/jugadores-table/jugadores-table.component';
import { JugadoresComponent } from './jugadores.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { JugadoresDialogComponent } from './components/jugadores-dialog/jugadores-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    JugadoresTableComponent,
    JugadoresComponent,
    JugadoresDialogComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    SharedModule,
  ],
  exports: [JugadoresComponent],
})
export class JugadoresModule {}
