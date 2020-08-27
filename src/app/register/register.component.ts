import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  constructor(
    public servicioUsuario: UsersService,
    private formularioFB: FormBuilder,
    public router: Router
  ) {
    this.formulario = this.formularioFB.group({
      usuario: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(4)]],
      confirmarContrasenia: [
        '',
        [Validators.required, Validators.minLength(4)],
      ] },
      {validator: this.matchingPasswords('contrasenia', 'confirmarContrasenia'),
    });
  }

  ngOnInit(): void {}

  get usuario() {
    return this.formulario.get('usuario');
  }
  get youEmail() {
    return this.formulario.get('youEmail');
  }
  get confirmarContrasenia() {
    return this.formulario.get('confirmarContrasenia');
  }
  get contrasenia() {
    return this.formulario.get('contrasenia');
  }

  registerClient() {
    this.router.navigateByUrl('registrarCliente');
    console.log('se ingreso como Cliente');
    console.warn(this.formulario.value);
    console.log(this.formulario.value);
  }

  registerProf() {
    this.router.navigateByUrl('registrarProfesional');
    console.log('se ingreso como Profesional');
    console.warn(this.formulario.value);
    console.log(this.formulario.value);
  }

  matchingPasswords(password: string, passwordConfirmation: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[passwordConfirmation];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onSubmit() {
    console.warn(this.formulario.value);
    console.log(this.formulario.value);
  }
}
