import { Component, OnInit } from '@angular/core';
import {  UsuarioFireBD } from 'src/app/domain/user';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: UsuarioFireBD[];
  
  constructor(chat: ChatService) {
    chat.getUsers().valueChanges().subscribe(users=>{
      this.users=users
    })
    /**
     *   chat.getUsers().valueChanges().subscribe(users=>{
      this.users=users.filter(u=>u.displayName==="algo")
    })
     */
    console.log(this.users)
  }
  /**LISTA DE TODOS LOS USUARIOS DEL CHAT
   * Si el usuario es tecnico que sean todos los usuarios sean profesionales, viceversa
   */

  ngOnInit(): void {
  }

}
