import { Component, OnInit } from '@angular/core';
import { Usuario } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { isNullOrUndefined } from 'util';

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

  public user$: Observable<any> = this.serviceUser.angularAuth.user; //esta conectado o no
  usuario:User
  fotoUrl:string="";
  actualizar: boolean;
  errors = []

  constructor(public serviceUser: AuthUserService) {}

  ngOnInit(): void {
    this.actualizar = false;
    this.cargarUser();
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
     this.usuario = await this.serviceUser.usuario
    } catch (error) {
      console.log(error)
      mostrarError(this,error)
    }
  }

  async foto(){
    const usuario = await this.serviceUser.usuario
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