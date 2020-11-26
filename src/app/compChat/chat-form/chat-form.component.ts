import { Component, Input, OnInit } from '@angular/core';
import { UsuarioFireBD } from 'src/app/domain/user';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string;
  @Input() usuario:UsuarioFireBD
  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  send() {
    this.chat.remitente=this.usuario.email
    this.chat.sendMessage(this.message);
    this.message = '';
    console.log("mensaje enviado")
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }
}
