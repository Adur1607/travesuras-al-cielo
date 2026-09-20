import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-rastreador',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './rastreador.html',
  styleUrl: './rastreador.css'
})
export class RastreadorComponent {
  rastreadorForm = new FormGroup({
    codigo: new FormControl('', Validators.required)
  });

  // Variables para controlar lo que se muestra en pantalla
  busquedaRealizada = false;
  resultado: any = null;

  buscar() {
    if (this.rastreadorForm.valid) {
      const code = this.rastreadorForm.get('codigo')?.value?.trim().toUpperCase();
      this.busquedaRealizada = true;

      // Simulamos la lógica que tenías en tu app.js original
      if (code === 'TRAV-2026') {
        this.resultado = {
          mascota: 'Peluchín',
          codigo: code,
          estado: 'Cremacion', // Fase actual
          mensaje: 'Tu mascota se encuentra en el proceso de cremación individual bajo el protocolo respetuoso. Estimamos concluir esta fase a las 12:30 PM.'
        };
      } else {
        // Respuesta dinámica para cualquier otro código
        this.resultado = {
          mascota: 'Fiel Amigo',
          codigo: code,
          estado: 'Custodia', // Fase actual
          mensaje: 'Hemos recibido a tu mascota en nuestras salas de resguardo climatizadas. El proceso de preparación ha iniciado de manera respetuosa.'
        };
      }
    } else {
      this.rastreadorForm.markAllAsTouched();
    }
  }
}