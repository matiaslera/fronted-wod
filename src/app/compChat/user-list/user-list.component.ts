import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/domain/user';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  users: Usuario[];
  
  constructor(chat: ChatService) {
    /* chat.getUsers().subscribe(users => {
      this.users = users;
    }); */
  }
  /**LISTA DE TODOS LOS USUARIOS DEL CHAT */

  ngOnInit(): void {
  }

}
