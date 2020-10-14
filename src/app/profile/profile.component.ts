import { Component, OnInit } from '@angular/core';
import { UserFB,  } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

import { ProfileService } from '../services/perfil/profile.service';
import { Profesional } from '../domain/profesional';
import { Cliente } from '../domain/cliente';

function mostrarError(component, error) {
  const errorMessage = (error.status === 0) ? 'No hay conexión con el backend, revise si el servidor remoto está levantado.' : error.error
  component.errors.push(errorMessage)
}
export type Tipo = Cliente | Profesional 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuario:User
  usuarioBD: Cliente|Profesional
  fotoUrl:string="";
  actualizar: boolean;
  errors = []

  constructor(public authServ: AuthUserService,public perfilSer: ProfileService) {}

  ngOnInit(): void {
    this.actualizar = false;
    //this.cargarUser();
    this.recuperarUserFB()
    console.log("usuario bd",this.usuarioBD)
    this.foto()
    /*tengo que cargar el uid del usuario para pasarlo a mysql*/ 
  }

  modify() {
    this.actualizar = true;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  async cargarUser() {
    try {
      console.log("asadasda")
    } catch (error) {
      console.log(error)
      mostrarError(this,error)
    }
  }
  async recuperarUserFB() {
    try {
      var usuario=new UserFB()
      await this.authServ.angularAuth.onAuthStateChanged( function(user) {
        if (user) {
         usuario.email=user.email
         usuario.providerId=user.providerId
         usuario.uid=user.uid
        } 
      })
      console.log(usuario)
    } catch (error) {
      console.log(error)
      mostrarError(this,error)
    }
  }

  async foto(){
    const usuario = await this.authServ.usuario
    try {
      if((usuario.photoURL)==null || this.fotoUrl !==""){
        this.fotoUrl= urlLocal
      }else{
      this.fotoUrl= this.usuario.photoURL}
    } catch (error) {
      console.log(error)
      mostrarError(this,error)
    }
  }
}

export const urlLocal= "../../assets/perfil01.jpg"