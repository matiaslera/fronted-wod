import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder,Validators,FormGroup,} from '@angular/forms';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { Calificacion, Tipo, UserFB } from 'src/app/domain/user';
import { Observable } from 'rxjs';
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
          debugger
          if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
            this.perfilSer.cliente.next(true)
            this.perfilSer.profesional.next(false)
            this.authSvc.setId(this.usuarioFull.id.toString())
            this.authSvc.setTipo("CLIENTE")
            console.log( this.perfilSer.usuarioBD);
          }
          if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
            this.perfilSer.cliente.next(false)
            this.perfilSer.profesional.next(true)
            this.authSvc.setId(this.usuarioFull.id.toString())
            this.authSvc.setTipo("PROFESIONAL")
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
    var usurioLogeado = new UserFB()
    try {
      await this.authSvc.loginWithGoogle();
      await this.authSvc.angularAuth.onAuthStateChanged(async user=>{
        if(user){
          usurioLogeado.email=user.email
          this.usuarioFull=await this.perfilSer.getEmail(usurioLogeado)
          var sinEmail= await this.perfilSer.getEmail(usurioLogeado)
          console.log(this.usuarioFull);
          console.log(sinEmail)
          debugger
          if(sinEmail.userEmail ==="ninguno"){
           return this.router.navigate(['/registar']);
          }
          if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
            this.perfilSer.cliente.next(true)
            this.perfilSer.profesional.next(false)
            this.authSvc.setId(this.usuarioFull.id.toString())
            this.authSvc.setTipo("CLIENTE")
            console.log( this.perfilSer.usuarioBD);
          }
          if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
            this.perfilSer.cliente.next(false)
            this.perfilSer.profesional.next(true)
            this.authSvc.setId(this.usuarioFull.id.toString())
            this.authSvc.setTipo("PROFESIONAL")
            console.log( this.perfilSer.usuarioBD);
          }
          console.log(this.usuarioFull);
          this.router.navigate(['/perfil']);
        }
      })
    } catch (error) {
      console.log(error);
    }
  }


}
