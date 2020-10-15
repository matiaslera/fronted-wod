import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import {  Tipo, UserFB,  } from '../domain/user';
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
export type Calificacion = Cliente | Profesional 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuarioFire:User
  usuarioFull: Calificacion
  usuarioBDatos:Calificacion
  usuarioFB=new UserFB()
  actualizar: boolean = false;
  errors = [];
  constructor(public authServ: AuthUserService,public perfilSer: ProfileService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    this.usuarioFB=this.perfilSer.usurioFB
    this.usuarioFull= await this.perfilSer.getEmail(this.usuarioFB)
    this.usuarioFire=this.authServ.usuario
    if(this.usuarioFull.usuario.tipo ===Tipo.CLIENTE){
      this.usuarioBDatos=new Cliente()
      this.usuarioBDatos = await this.perfilSer.getIdCliente(this.usuarioFull.id)
    }
    if(this.usuarioFull.usuario.tipo===Tipo.PROFESIONAL){
      this.usuarioBDatos=new Profesional()
      this.usuarioBDatos = await this.perfilSer.getIdProfesional(this.usuarioFull.id)
    }
    this.recuperarUserCP()
    this.foto()
    console.log(this.usuarioFB)
    console.log(this.usuarioFull)
    console.log(this.authServ.usuario)
    /*tengo que cargar el uid del usuario para pasarlo a mysql*/ 
  }

  modify() {
    this.actualizar = true;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  async recuperarUserCP() {
    try {
      /* await this.authServ.angularAuth.onAuthStateChanged( user=>{
      this.usuarioFB.email=user.email
      this.usuarioFB.providerId=user.providerId
      this.usuarioFB.uid=user.uid}) */
    
      console.log(this.usuarioBDatos)
    } catch (error) {
      console.log(error)
      mostrarError(this,error)
    }
  }

  foto():boolean{
    if (this.authServ.usuario.photoURL===null){
      return false
    }
    return true
  }
}

export const urlLocal= "../../assets/perfil01.jpg"