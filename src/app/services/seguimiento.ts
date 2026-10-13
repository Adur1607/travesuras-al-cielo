
import { Injectable } from '@angular/core';

export interface SeguimientoMascota {
  id: number;
  codigo: string;
  cliente: string;
  mascota: string;
  servicio: string;
  fecha: string;
  estado: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {

  private readonly clave = 'travesuras_seguimiento';

  private mascotasIniciales: SeguimientoMascota[] = [
    {
      id: 1,
      codigo: 'TRAV-2026',
      cliente: 'María Torres',
      mascota: 'Peluchín',
      servicio: 'Cremación Individual',
      fecha: '2026-10-15',
      estado: 'En cremación'
    },
    {
      id: 2,
      codigo: 'TRAV-2027',
      cliente: 'Carlos Ramírez',
      mascota: 'Luna',
      servicio: 'Cremación Colectiva',
      fecha: '2026-10-16',
      estado: 'En cremación'
    },
    {
      id: 3,
      codigo: 'TRAV-2028',
      cliente: 'Ana Flores',
      mascota: 'Max',
      servicio: 'Cremación Individual',
      fecha: '2026-10-18',
      estado: 'En cremación'
    }
  ];

  private mascotas: SeguimientoMascota[] = this.cargarMascotas();

  private cargarMascotas(): SeguimientoMascota[] {
    try {
      const guardadas = localStorage.getItem(this.clave);

      if (guardadas) {
        const datos: unknown = JSON.parse(guardadas);

        if (Array.isArray(datos)) {
          return datos as SeguimientoMascota[];
        }
      }
    } catch {
      console.warn('No se pudieron recuperar los datos de seguimiento.');
    }

    return this.mascotasIniciales.map(mascota => ({ ...mascota }));
  }

  private guardarMascotas(): void {
    try {
      localStorage.setItem(this.clave, JSON.stringify(this.mascotas));
    } catch {
      console.error('No se pudieron guardar los datos de seguimiento.');
    }
  }

  obtenerMascotas(): SeguimientoMascota[] {
    this.mascotas = this.cargarMascotas();
    return this.mascotas;
  }

  buscarPorCodigo(codigo: string): SeguimientoMascota | undefined {
    this.mascotas = this.cargarMascotas();

    return this.mascotas.find(
      mascota =>
        mascota.codigo.toLowerCase() === codigo.trim().toLowerCase()
    );
  }

  actualizarEstado(id: number, nuevoEstado: string): boolean {
    const estadosPermitidos = [
      'En cremación',
      'Cremación finalizada',
      'Urna preparada'
    ];

    this.mascotas = this.cargarMascotas();

    const mascota = this.mascotas.find(item => item.id === id);

    if (!mascota || !estadosPermitidos.includes(nuevoEstado)) {
      return false;
    }

    mascota.estado = nuevoEstado;
    this.guardarMascotas();

    return true;
  }
}
