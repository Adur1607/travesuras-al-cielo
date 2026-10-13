
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeguimientoService } from '../../services/seguimiento';

@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './evaluacion.html',
  styleUrl: './evaluacion.css'
})
export class EvaluacionComponent {

  codigo = 'TRAV-2026';
  confirmado = false;
  calificacion = 0;
  comentario = '';
  enviado = false;
  mensajeError = '';

  private readonly claveEvaluaciones = 'travesuras_evaluaciones';

  constructor(private seguimientoService: SeguimientoService) {}

  confirmarRecepcion(): void {
    this.mensajeError = '';

    const mascota = this.seguimientoService.buscarPorCodigo(this.codigo);

    if (!mascota) {
      this.mensajeError = 'No encontramos una solicitud con ese código.';
      return;
    }

    if (mascota.estado !== 'Urna preparada') {
      this.mensajeError =
        'La urna todavía no está preparada para confirmar su recepción.';
      return;
    }

    this.confirmado = true;
  }

  enviarEvaluacion(): void {
    this.mensajeError = '';

    if (!this.confirmado) {
      this.mensajeError = 'Primero debes confirmar la recepción de la urna.';
      return;
    }

    if (this.calificacion < 1 || this.calificacion > 5) {
      this.mensajeError = 'Selecciona una calificación de 1 a 5 estrellas.';
      return;
    }

    const mascota = this.seguimientoService.buscarPorCodigo(this.codigo);

    if (!mascota || mascota.estado !== 'Urna preparada') {
      this.mensajeError = 'No se pudo validar la solicitud.';
      return;
    }

    try {
      const evaluacionesGuardadas = localStorage.getItem(
        this.claveEvaluaciones
      );

      const evaluaciones: {
        codigo: string;
        mascota: string;
        calificacion: number;
        comentario: string;
        fecha: string;
      }[] = evaluacionesGuardadas
        ? JSON.parse(evaluacionesGuardadas)
        : [];

      if (evaluaciones.some(item => item.codigo === mascota.codigo)) {
        this.mensajeError = 'Esta solicitud ya tiene una evaluación registrada.';
        return;
      }

      evaluaciones.push({
        codigo: mascota.codigo,
        mascota: mascota.mascota,
        calificacion: this.calificacion,
        comentario: this.comentario.trim(),
        fecha: new Date().toISOString()
      });

      localStorage.setItem(
        this.claveEvaluaciones,
        JSON.stringify(evaluaciones)
      );

      this.enviado = true;
    } catch {
      this.mensajeError =
        'No se pudo guardar la evaluación. Inténtalo nuevamente.';
    }
  }
}
