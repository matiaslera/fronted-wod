import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup,} from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { Calificacion, Tipo, UserFB } from 'src/app/domain/user';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario: FormGroup;
  noInicioSesion = false;
  public user$: Observable<any> = this.authSvc.angularAuth.user;
  cliente: boolean=true;
  tecnico: boolean=true;
  usuarioFull: Calificacion
  usuarioBDatos:Calificacion
  usuarioFB=new UserFB()
  actualizar: boolean = false;
  errors = [];

  constructor( public router: Router,private formularioFB: FormBuilder,private authSvc: AuthUserService,public perfilSer: ProfileService ) {
    this.formulario = this.formularioFB.group({
      usuario: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async ngOnInit(): Promise<void> {
    console.log('ejecutando ando');
    /* this.usuarioFB=this.perfilSer.usurioFB
    this.usuarioFull= await this.perfilSer.getEmail(this.usuarioFB)
    this.usuarioFire=this.authSvc.usuario
    if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
      this.cliente=true
      this.tecnico=false
      this.usuarioBDatos=new Cliente()
      this.usuarioBDatos = await this.perfilSer.getIdCliente(this.usuarioFull.id)
    }
    if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
      this.tecnico=true
      this.cliente=false
      this.usuarioBDatos=new Profesional()
      this.usuarioBDatos = await this.perfilSer.getIdProfesional(this.usuarioFull.id)
    } */
  }

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
      await this.authSvc.angularAuth.onAuthStateChanged(async user=>{
        if(user){
          this.usuarioFull=await this.perfilSer.getEmail(usurioLogeado)
          if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
            this.perfilSer.cliente.next(true)
            this.perfilSer.profesional.next(false)
            this.usuarioBDatos=new Cliente()
            this.perfilSer.usuarioBD = await this.perfilSer.getIdCliente(this.usuarioFull.id)
            console.log( this.perfilSer.usuarioBD);
          }
          if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
            this.perfilSer.cliente.next(false)
            this.perfilSer.profesional.next(false)
            this.usuarioBDatos=new Profesional()
            this.perfilSer.usuarioBD = await this.perfilSer.getIdProfesional(this.usuarioFull.id)
            console.log( this.perfilSer.usuarioBD);
          }
          console.log(this.usuarioFull);
          await this.router.navigate(['/perfil']);
        }
      })
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

  async accederBaseDatos(){
    /* if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
      this.perfilSer.esCliente=true
      this.perfilSer.esProfesional=false
      this.usuarioBDatos=new Cliente()
      this.perfilSer.usuarioBD = await this.perfilSer.getIdCliente(this.usuarioFull.id)
      console.log( this.perfilSer.usuarioBD);
    }
    if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
      this.perfilSer.esProfesional=true
      this.perfilSer.esCliente=false
      this.usuarioBDatos=new Profesional()
      this.perfilSer.usuarioBD = await this.perfilSer.getIdProfesional(this.usuarioFull.id)
      console.log( this.perfilSer.usuarioBD);
    } */
    console.log(this.usuarioFull);
  }
}
