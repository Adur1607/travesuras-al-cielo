import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './solicitud.html',
  styleUrl: './solicitud.css'
})
export class SolicitudComponent {
  solicitudForm = new FormGroup({
    servicio: new FormControl('', Validators.required),
    fecha: new FormControl('', Validators.required),
    detalles: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.solicitudForm.valid) {
      alert('Tu solicitud ha sido registrada. Un asesor coordinará el recojo a la brevedad.');
      console.log(this.solicitudForm.value);
      this.solicitudForm.reset();
    } else {
      this.solicitudForm.markAllAsTouched();
    }
  }
}