import { SimpleChanges } from '@angular/core';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AngularFireList } from '@angular/fire/database';
import { Observable, Subject } from 'rxjs';
import { ChatMessage } from 'src/app/domain/chat';
import { UsuarioFireBD } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnChanges {

  @Input() remitenteChat:string
  feed: ChatMessage[]=[]
  ownEmail:string
  //remitenteChat:string
  @Input() usuario:UsuarioFireBD
  remitenteFeed:Observable<string>=this.chat.esRemitente

  constructor(private chat: ChatService,private authService: AuthUserService) {
    this.remitenteFeed.subscribe(remitente=>this.remitenteChat=remitente)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    for (const propName in changes) {
    console.log(this.remitenteChat)
    console.log(this.ownEmail)
    this.chat.getMessages().valueChanges().subscribe(chatMensaje=>{this.feed=chatMensaje.filter
      (chat=>(chat.email===this.ownEmail && chat.remitente===this.usuario.email)||(chat.email===this.usuario.email && chat.remitente===this.ownEmail))
  })}
}

  ngOnInit() {
    this.authService.angularAuth.onAuthStateChanged(user=>{
      this.ownEmail = user.email;//email iniciado
       this.chat.getMessages().valueChanges().subscribe(chatMensaje=>{this.feed=chatMensaje.filter
        (chat=>(chat.email===this.ownEmail && chat.remitente===this.remitenteChat)||(chat.email===this.remitenteChat && chat.remitente===this.ownEmail))})
    })
    //this.chat.getMessages().valueChanges().subscribe(chatMensaje=>this.feed=chatMensaje.filter(chats=>chats.email===this.ownEmail&& chats.remitente===this.chat.remitente))
    console.log("cantidad de mensajes",this.feed)
    console.log(this.chat.getMessages().valueChanges().subscribe(chat=>{this.feed=chat.filter(chats=>chats.email===this.ownEmail)}))
    /* this.chat.getUsers().valueChanges().subscribe(usuarios=>{
      this.users=usuarios.filter(user=>user.tipo!==this.usuarioBDatos.usuario.tipo)/* .filter(user=>{user.tipo!==this.usuarioBDatos.usuario.tipo, console.log(user.tipo)}) 
    }) */
  }

  cargarFeed(usuario:UsuarioFireBD){
    this.authService.angularAuth.onAuthStateChanged(user=>{
      this.ownEmail = user.email;//email iniciado
       this.chat.getMessages().valueChanges().subscribe(chatMensaje=>{this.feed=chatMensaje.filter
        (chat=>(chat.email===this.ownEmail && chat.remitente===usuario.email)||(chat.email===usuario.email && chat.remitente===this.ownEmail))})
    })
  }
}
