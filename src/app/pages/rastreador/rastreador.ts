
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SeguimientoService,
  SeguimientoMascota
} from '../../services/seguimiento';

@Component({
  selector: 'app-rastreador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rastreador.html',
  styleUrl: './rastreador.css'
})
export class RastreadorComponent {

  codigo = '';
  mascota: SeguimientoMascota | null = null;
  mensajeError = '';

  constructor(private seguimientoService: SeguimientoService) {}

  buscarSeguimiento(): void {
    const resultado = this.seguimientoService.buscarPorCodigo(this.codigo);

    if (resultado) {
      this.mascota = resultado;
      this.mensajeError = '';
    } else {
      this.mascota = null;
      this.mensajeError = 'No encontramos una solicitud con ese código.';
    }
  }

  obtenerPasos(): { nombre: string; completado: boolean; activo: boolean }[] {
    const estados = [
      'Solicitud recibida',
      'En recojo',
      'En planta',
      'En cremación',
      'Cremación finalizada',
      'Urna preparada',
      'Listo para entrega'
    ];

    const estadoActual = this.mascota?.estado ?? '';
    const indiceActual = estados.indexOf(estadoActual);

    return estados.map((nombre, indice) => ({
      nombre,
      completado: indiceActual >= 0 && indice < indiceActual,
      activo: indice === indiceActual
    }));
  }
}
