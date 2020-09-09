import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
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

  constructor(
    public servicioUsuario: UsersService,
    public router: Router,
    private formularioFB: FormBuilder,
    private authSvc: AuthUserService
  ) {
    this.formulario = this.formularioFB.group({
      usuario: ['', Validators.required],
      contrasenia: ['', [Validators.required, Validators.minLength(4)]],
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
    const {usuario,contrasenia } = this.formulario.value
    try{
      const user=await this.authSvc.login(usuario,contrasenia)
      if(user){
        this.router.navigate(['/perfil']);
      }
    }
    catch(error){
      console.log(error)
    }
    
   
  }
}
