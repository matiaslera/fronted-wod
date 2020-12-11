import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/domain/chat';
import { UsuarioFireBD } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() remitenteChat:string
  seleccion:boolean=false
  feed: ChatMessage[]=[]
  ownEmail:string

  constructor(private chat: ChatService,private authService: AuthUserService) {
    /* this.usuario=null
    console.log(this.usuario)
    console.log(this.usuario===null) */
    console.log(this.seleccion)
  }
  
  ngOnInit() {
    /* this.authService.angularAuth.onAuthStateChanged(user=>{
      this.ownEmail = user.email;//email iniciado
       this.chat.getMessages().valueChanges().subscribe(chatMensaje=>{this.feed=chatMensaje.filter
        (chat=>(chat.email===this.ownEmail && chat.remitente===this.remitenteChat)||(chat.email===this.remitenteChat && chat.remitente===this.ownEmail))})
    }) */
  }

  cargarFeed(usuario:UsuarioFireBD){
    this.seleccion=true
    console.log(this.seleccion)
    this.authService.angularAuth.onAuthStateChanged(user=>{
      this.ownEmail = user.email;//email iniciado
       this.chat.getMessages().valueChanges().subscribe(chatMensaje=>{this.feed=chatMensaje.filter
        (chat=>(chat.email===this.ownEmail && chat.remitente===usuario.email)||(chat.email===usuario.email && chat.remitente===this.ownEmail))})
    })
  }

}
