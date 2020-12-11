import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/domain/chat';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  
  @Input() chatMessage: ChatMessage;
  userEmail: string;//email del emisor chat del mensaje
  userName: string;//display name del emisor del chat del mensaje
  messageContent: string;//contenido del mensaje
  //timeStamp: Date = new Date();
  timeEnvio:string;//tiempo de envio
  isOwnMessage: boolean;//es el que escribio ese mensaje
  //ownEmail: string;//email iniciado en firebase

  constructor(private authService: AuthUserService) {
    this.authService.angularAuth.onAuthStateChanged(user=>{
      this.isOwnMessage = user.email === this.userEmail;
      // this.ownEmail = user.email;//email iniciado
    })
  }

  ngOnInit(chatMessage = this.chatMessage) {
    console.log(this.chatMessage)
    console.log("este es el key:"+ this.chatMessage.$key)
    this.messageContent = chatMessage.message;
    this.timeEnvio = chatMessage.timeEnvio;
    this.userEmail = chatMessage.email;
    this.userName = chatMessage.userName;
  }

}
