import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cobertura',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cobertura.html',
  styleUrl: './cobertura.css'
})
export class CoberturaComponent {
  coberturaForm = new FormGroup({
    distrito: new FormControl('', Validators.required)
  });

  resultado: { mensaje: string, tipo: 'success' | 'warning' | 'error' } | null = null;

  verificar(nombreDistrito: string) {
    if (this.coberturaForm.valid) {
      const valor = this.coberturaForm.get('distrito')?.value;

      if (valor === 'cobertura-completa') {
        this.resultado = {
          tipo: 'success',
          mensaje: `✓ ¡Excelente! Tenemos cobertura completa e inmediata en ${nombreDistrito}. Traslado gratuito incluido en el paquete individual.`
        };
      } else if (valor === 'cobertura-especial') {
        this.resultado = {
          tipo: 'warning',
          mensaje: `➔ En ${nombreDistrito} atendemos de forma programada o especial. Por favor, contáctanos directamente para coordinar el tiempo de llegada.`
        };
      }
    } else {
      this.resultado = {
        tipo: 'error',
        mensaje: 'Por favor, selecciona un distrito válido.'
      };
      this.coberturaForm.markAllAsTouched();
    }
  }
}