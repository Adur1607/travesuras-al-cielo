
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

interface ResultadoCobertura {
  tipo: 'info' | 'warning';
  mensaje: string;
}

@Component({
  selector: 'app-cobertura',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cobertura.html',
  styleUrl: './cobertura.css'
})
export class CoberturaComponent {
  coberturaForm: FormGroup;
  resultado: ResultadoCobertura | null = null;

  constructor(private fb: FormBuilder) {
    this.coberturaForm = this.fb.group({
      distrito: ['', Validators.required]
    });
  }

  verificar(nombreDistrito: string): void {
    if (this.coberturaForm.invalid) {
      this.coberturaForm.markAllAsTouched();
      this.resultado = null;
      return;
    }

    const valorSeleccionado =
      this.coberturaForm.controls['distrito'].value;

    if (valorSeleccionado === 'cobertura-completa') {
      this.resultado = {
        tipo: 'info',
        mensaje:
          `El distrito seleccionado (${nombreDistrito}) figura ` +
          'en nuestra lista de zonas principales. Confirma la ' +
          'disponibilidad y el costo del traslado con un asesor.'
      };
      return;
    }

    if (valorSeleccionado === 'cobertura-especial') {
      this.resultado = {
        tipo: 'warning',
        mensaje:
          'Esta opción corresponde a zonas por confirmar. ' +
          'Contacta con un asesor para verificar la disponibilidad ' +
          'y cualquier costo adicional.'
      };
      return;
    }

    this.resultado = {
      tipo: 'warning',
      mensaje:
        'No se reconoce la opción seleccionada. ' +
        'Elige un distrito de la lista.'
    };
  }
}
