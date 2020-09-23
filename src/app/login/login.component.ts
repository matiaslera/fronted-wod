import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { AuthUserService } from '../services/auth/auth-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  noInicioSesion = false;

  constructor(
    public router: Router,
    private formularioFB: FormBuilder,
    private authSvc: AuthUserService
  ) {
    this.formulario = this.formularioFB.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get usuario() {
    return this.formulario.get('usuario');
  }
  get contrasenia() {
    return this.formulario.get('contrasenia');
  }

  async login() {
    const { usuario, contrasenia } = this.formulario.value;
    try {
      await this.authSvc.login(usuario, contrasenia);
    } catch (error) {
      console.log(error);
    }
  }

  async accessGoogle() {
    try {
      await this.authSvc.loginWithGoogle();
      this.authSvc.logueado;
      console.log('esta logueado:', this.authSvc.logueado);
      if (this.authSvc.initApp()) {
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
