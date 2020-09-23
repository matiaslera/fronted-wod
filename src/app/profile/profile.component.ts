import { Component, OnInit } from '@angular/core';
import { Usuario } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuario=new Usuario()
  actualizar:boolean
  constructor(public serviceUser:AuthUserService) {
    this.usuario.apellido="gomez"
    this.usuario.nombre="pepe"
    this.usuario.alias="pepe_gomez"
    this.usuario.email="pepe@hotmail.com"
    this.usuario.dni=3658465
    this.usuario.telefono=154789456
    this.usuario.direccion="av siempre viva 123"
   }

  ngOnInit(): void {
    this.actualizar=false
  }

  modify(){
    this.actualizar=true
  }

  cancel(condicion){
    this.actualizar=condicion
  }

  async getUser(){
    try {
      return await this.serviceUser.userCurrent()
    } catch (error) {
      console.log(error)
    }
  }
}
