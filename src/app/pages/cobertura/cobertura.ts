import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cobertura',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cobertura.html',
  styleUrl: './cobertura.css'
})
export class CoberturaComponent {
  coberturaForm: FormGroup;
  resultado: any = null;

  constructor(private fb: FormBuilder) {
    this.coberturaForm = this.fb.group({
      distrito: ['', Validators.required]
    });
  }

  // Recibimos el nombre exacto del distrito desde el HTML
  verificar(nombreDistrito: string) {
    if (this.coberturaForm.invalid || !nombreDistrito || nombreDistrito.includes('--')) {
      this.resultado = null;
      return;
    }

    const valorSelect = this.coberturaForm.get('distrito')?.value;

    // Inyectamos la variable nombreDistrito en el mensaje
    if (valorSelect === 'cobertura-completa') {
      this.resultado = {
        tipo: 'success',
        mensaje: `✓ ¡Excelente! Tenemos cobertura completa e inmediata en ${nombreDistrito}. Traslado gratuito incluido en el paquete individual.`
      };
    } else if (valorSelect === 'cobertura-especial') {
      this.resultado = {
        tipo: 'warning',
        mensaje: `⚠️ Para la zona de ${nombreDistrito}, el recojo está sujeto a disponibilidad y podría tener un recargo por distancia. Contáctanos para coordinar.`
      };
    }
  }
}