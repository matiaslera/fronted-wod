import { Component, OnInit } from '@angular/core';
import { Usuario } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { isNullOrUndefined } from 'util';
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
    this.cargarUser();
    
    console.log("usuario service current user",)
    console.log("usuario service solo user",this.authServ.angularAuth.user)
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
      var user=new Usuario()
      var a=await this.authServ.angularAuth.currentUser
      var b=await this.authServ.angularAuth.user
      user.email=a.email
      
     this.usuario =  await this.authServ.angularAuth.currentUser
     //this.usuarioBD = await this.perfilSer.getCliente(this.perfilSer.cliente.usuario.email)
     let usuarioBD2=await this.perfilSer.getCliente(user)
     this.usuarioBD.usuario.uid=this.usuario.uid
     //await this.perfilSer.actualizarCliente(usuarioBD2)
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