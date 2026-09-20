import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  registroForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    mascota: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required)
  });

  onSubmit() {
    if (this.registroForm.valid) {
      alert('Registro exitoso. ¡Bienvenido a Travesuras al Cielo!');
      console.log(this.registroForm.value);
      this.registroForm.reset();
    } else {
      this.registroForm.markAllAsTouched();
    }
  }
}