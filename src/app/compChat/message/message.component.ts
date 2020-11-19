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
  userEmail: string;
  userName: string;
  messageContent: string;
  timeStamp: Date = new Date();
  timeEnvio:string;
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthUserService) {
    this.authService.angularAuth.onAuthStateChanged(user=>{
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.userEmail;
    })
  }

  ngOnInit(chatMessage = this.chatMessage) {
    console.log(chatMessage)
    console.log(this.chatMessage)
    this.messageContent = chatMessage.message;
    console.log(this.messageContent )
    this.timeEnvio = chatMessage.timeEnvio;
    console.log(this.timeEnvio)
    this.userEmail = chatMessage.email;
    console.log(this.userEmail)
    this.userName = chatMessage.userName;
    console.log(this.userName)
  }

}
