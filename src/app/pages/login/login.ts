
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  constructor(private router: Router) {}
  errorLogin = '';

  loginForm = new FormGroup({
    rol: new FormControl<'cliente' | 'administrador'>(
      'cliente',
      { validators: [Validators.required] }
    ),
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  onSubmit(): void {
    this.errorLogin = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { rol, correo, password } = this.loginForm.getRawValue();

    // Credenciales ficticias para probar la interfaz.
    // No son un sistema de autenticación real.
    const credencialesDemo = {
      cliente: {
        correo: 'cliente@travesuras.com',
        password: 'Cliente123'
      },
      administrador: {
        correo: 'admin@travesuras.com',
        password: 'Admin123'
      }
    };

    const credencialCorrecta =
      rol !== null &&
      correo?.trim().toLowerCase() === credencialesDemo[rol].correo &&
      password === credencialesDemo[rol].password;

    if (!credencialCorrecta) {
      this.errorLogin =
        'Correo, contraseña o tipo de usuario incorrectos.';
      return;
    }

    if (rol === 'administrador') {
  alert('Inicio de sesión de demostración correcto: administrador.');
  this.router.navigate(['/admin']);
  return;
}

alert(
  'Inicio de sesión de demostración correcto: cliente. ' +
  'El panel del cliente aún está pendiente de implementar.'
);

    console.log('Inicio de sesión de demostración:', {
      rol,
      correo: correo?.trim().toLowerCase()
    });
  }
}
