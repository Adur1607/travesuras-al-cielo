
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  registroForm = new FormGroup({
    nombreCompleto: new FormControl('', [
      Validators.required
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ]),
    celular: new FormControl('', [
      Validators.required,
      Validators.pattern(/^9\d{8}$/)
    ]),
    nombreMascota: new FormControl('', [
      Validators.required
    ]),
    especie: new FormControl('', [
      Validators.required
    ]),
    peso: new FormControl('', [
      Validators.required,
      Validators.min(0.1)
    ])
  });

  onSubmit(): void {
    if (this.registroForm.invalid) {
      this.registroForm.markAllAsTouched();
      return;
    }

    alert(
      'Formulario válido. ¡Bienvenido a Travesuras al Cielo!'
    );

    console.log(this.registroForm.value);
    this.registroForm.reset();
  }
}
