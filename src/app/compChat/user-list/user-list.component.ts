import { Component, OnInit } from '@angular/core';
import {  Calificacion, UsuarioFireBD } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: UsuarioFireBD[];
  usuarioBDatos: Calificacion;
  chatRemitente: string;
  
  constructor(public chat: ChatService,public authServ: AuthUserService,
    public perfilSer: ProfileService,) {
  }
  /**LISTA DE TODOS LOS USUARIOS DEL CHAT
   * Si el usuario es tecnico que sean todos los usuarios sean profesionales, viceversa
   */

  async ngOnInit(): Promise<void> {
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      console.log('estoy en LOCAL STORAGE- CLIENTE:', this.usuarioBDatos);
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.usuarioBDatos);
    }
    this.chat.getUsers().valueChanges().subscribe(usuarios=>{
      this.users=usuarios.filter(user=>user.tipo!==this.usuarioBDatos.usuario.tipo)/* .filter(user=>{user.tipo!==this.usuarioBDatos.usuario.tipo, console.log(user.tipo)}) */
    })
  }

  seleccionar(usuario:UsuarioFireBD){
    this.chat.remitente$.next(usuario.email)
    this.chat.esRemitente.subscribe(chat=>this.chatRemitente=chat)
    console.log(this.chat.remitente$.subscribe())
    console.log(this.chatRemitente)
  }

}
