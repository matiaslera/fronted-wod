import { Component, Input, OnInit } from '@angular/core';
import { UsuarioFireBD } from 'src/app/domain/user';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: UsuarioFireBD;
  chatRemitente:string
  constructor(private chat: ChatService) { }

  ngOnInit(): void {
  }

  seleccionar(usuario:UsuarioFireBD){
    this.chat.remitente$.next(usuario.email)
    this.chat.esRemitente.subscribe(chat=>this.chatRemitente=chat)
    console.log(this.chat.remitente$.subscribe())
    console.log(this.chatRemitente)
  }

}