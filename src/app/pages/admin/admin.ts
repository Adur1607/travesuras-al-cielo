
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

interface Solicitud {
  id: number;
  cliente: string;
  servicio: string;
  fecha: string;
  estado: string;
  vehiculo: string;
  conductor: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class AdminComponent {

  solicitudes: Solicitud[] = [
    {
      id: 1,
      cliente: 'María Torres',
      servicio: 'Cremación Individual',
      fecha: '2026-10-15',
      estado: 'Pendiente',
      vehiculo: '',
      conductor: ''
    },
    {
      id: 2,
      cliente: 'Carlos Ramírez',
      servicio: 'Cremación Colectiva',
      fecha: '2026-10-16',
      estado: 'Pendiente',
      vehiculo: '',
      conductor: ''
    },
    {
      id: 3,
      cliente: 'Ana Flores',
      servicio: 'Cremación Individual',
      fecha: '2026-10-18',
      estado: 'Pendiente',
      vehiculo: '',
      conductor: ''
    }
  ];

  vehiculos = [
    'Vehículo V-01',
    'Vehículo V-02',
    'Vehículo V-03'
  ];

  conductores = [
    'José Mendoza',
    'Luis Vargas',
    'Pedro Castillo'
  ];

  solicitudSeleccionada: Solicitud | null = null;
  mensaje = '';

  asignacionForm = new FormGroup({
    vehiculo: new FormControl('', Validators.required),
    conductor: new FormControl('', Validators.required)
  });

  gestionarSolicitud(solicitud: Solicitud): void {
    this.solicitudSeleccionada = solicitud;
    this.mensaje = '';

    this.asignacionForm.reset({
      vehiculo: solicitud.vehiculo,
      conductor: solicitud.conductor
    });
  }

  confirmarAsignacion(): void {
    if (!this.solicitudSeleccionada) {
      return;
    }

    if (this.asignacionForm.invalid) {
      this.asignacionForm.markAllAsTouched();
      return;
    }

    const { vehiculo, conductor } =
      this.asignacionForm.getRawValue();

    if (!vehiculo || !conductor) {
      return;
    }

    this.solicitudSeleccionada.vehiculo = vehiculo;
    this.solicitudSeleccionada.conductor = conductor;
    this.solicitudSeleccionada.estado = 'Recojo Programado';

    this.mensaje =
      `Se asignó ${vehiculo} con el conductor ${conductor} ` +
      `a la solicitud #${this.solicitudSeleccionada.id}.`;

    this.solicitudSeleccionada = null;
    this.asignacionForm.reset();
  }

  cancelarAsignacion(): void {
    this.solicitudSeleccionada = null;
    this.asignacionForm.reset();
    this.mensaje = '';
  }
}
