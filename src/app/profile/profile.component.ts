import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'
import {  Calificacion, Tipo, UserFB,  } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';

import { ProfileService } from '../services/perfil/profile.service';
import { Profesional } from '../domain/profesional';
import { Cliente } from '../domain/cliente';
import { constants } from 'buffer';

function mostrarError(component, error) {
  const errorMessage = (error.status === 0) ? 'No hay conexión con el backend, revise si el servidor remoto está levantado.' : error.error
  component.errors.push(errorMessage)
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuarioFire:User
  usuarioFull: Calificacion
  usuarioBDatos:Calificacion// =this.perfilSer.usuarioBD
  usuarioFB=new UserFB()
  actualizar: boolean = false;
  errors = [];
  constructor(public authServ: AuthUserService,public perfilSer: ProfileService, private snackBar: MatSnackBar) {}

  async ngOnInit(): Promise<void> {
    this.usuarioFB=this.perfilSer.usurioFB
    this.usuarioBDatos=this.perfilSer.usuarioBD
    console.log(this.usuarioBDatos)
  }

  modify() {
    this.actualizar = true;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  foto():boolean{
    if (this.authServ.usuario.photoURL===null){
      return false
    }
    return true
  }
}

export const urlLocal= "../../assets/perfil01.jpg"