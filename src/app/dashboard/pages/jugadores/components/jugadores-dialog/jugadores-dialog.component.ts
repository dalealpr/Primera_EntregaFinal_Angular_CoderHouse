import { Component, Inject, OnInit } from '@angular/core';
import { Jugador } from '../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-jugadores-dialog',
  templateUrl: './jugadores-dialog.component.html',
  styleUrls: ['./jugadores-dialog.component.scss'],
})
export class JugadoresDialogComponent {
  jugadorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<JugadoresDialogComponent>,

    // Recibo data usuario
    @Inject(MAT_DIALOG_DATA) public jugador?: Jugador
  ) {
    this.jugadorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      edad: ['', [Validators.required]],
      nacionalidad: ['', [Validators.required]],
      equipo: ['', [Validators.required]],
      posicion: ['', [Validators.required]],
    });

    if (this.jugador) {
      this.jugadorForm.patchValue(this.jugador);
    }
    if (this.jugador) {
      this.jugadorForm.patchValue(this.jugador);
    }
  }

  closeDialog() {
    this.matDialogRef.close();
  }

  onSubmit(): void {
    if (this.jugadorForm.invalid) {
      this.jugadorForm.markAllAsTouched();
    } else {
      this.matDialogRef.close(this.jugadorForm.value);
    }
  }
}
