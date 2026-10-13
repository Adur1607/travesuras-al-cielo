
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  SeguimientoService,
  SeguimientoMascota
} from '../../services/seguimiento';

@Component({
  selector: 'app-operario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './operario.html',
  styleUrl: './operario.css'
})
export class OperarioComponent {

  mascotas: SeguimientoMascota[];

  constructor(private seguimientoService: SeguimientoService) {
    this.mascotas = this.seguimientoService.obtenerMascotas();
  }

  actualizarEstado(mascota: SeguimientoMascota, nuevoEstado: string): void {
    const actualizado = this.seguimientoService.actualizarEstado(
      mascota.id,
      nuevoEstado
    );

    if (actualizado) {
      mascota.estado = nuevoEstado;
    }
  }
}
