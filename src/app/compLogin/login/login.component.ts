import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup,} from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { UserFB } from 'src/app/domain/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  noInicioSesion = false;

  constructor( public router: Router,private formularioFB: FormBuilder,private authSvc: AuthUserService,public perfilSer: ProfileService ) {
    this.formulario = this.formularioFB.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  get usuario() {
    return this.formulario.get('usuario'); }

  get contrasenia() {
    return this.formulario.get('contrasenia'); }

  async login() {
    var usurioLogeado = new UserFB()
    const { usuario, contrasenia } = this.formulario.value;
    usurioLogeado.email=usuario
    try {
      await this.authSvc.login(usuario, contrasenia);
      this.perfilSer.usurioFB=usurioLogeado
      this.router.navigate(['/perfil']);
    } catch (error) {
      console.log(error);
    }
  }

  async accessGoogle() {
    try {
      await this.authSvc.loginWithGoogle();
        this.router.navigate(['/perfil']);
    } catch (error) {
      console.log(error);
    }
  }
}
