
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css'
})
export class SolicitudComponent {
  readonly fechaMinima = this.obtenerFechaActual();

  solicitudForm = new FormGroup({
    servicio: new FormControl('', [
      Validators.required
    ]),
    fecha: new FormControl('', [
      Validators.required
    ]),
    direccion: new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
    detalles: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  private obtenerFechaActual(): string {
    const ahora = new Date();
    const anio = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');

    return `${anio}-${mes}-${dia}`;
  }

  onSubmit(): void {
    if (this.solicitudForm.invalid) {
      this.solicitudForm.markAllAsTouched();
      return;
    }

    const fechaSeleccionada =
      this.solicitudForm.controls.fecha.value;

    if (!fechaSeleccionada || fechaSeleccionada < this.fechaMinima) {
      this.solicitudForm.controls.fecha.setErrors({
        fechaPasada: true
      });
      this.solicitudForm.controls.fecha.markAsTouched();
      return;
    }

    console.log(
      'Solicitud de demostración:',
      this.solicitudForm.getRawValue()
    );

    alert(
      'La solicitud es válida. Todavía no se ha guardado en el servidor.'
    );
  }
}
