import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Calificacion, UsuarioFireBD } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ChatService } from 'src/app/services/chat/chat.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { FeedComponent } from '../feed/feed.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scroller') private feedContainer: ElementRef;

  users: UsuarioFireBD[];
  usuariosChatRefs: Observable<any[]>;
  usuarioBDatos: Calificacion;
  chatRemitente: string;
  soyRemitente:string;

  selecionUser =new EventEmitter<UsuarioFireBD>();
  @ViewChild(FeedComponent) childView: FeedComponent;

  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth, private chatSer:ChatService,public authServ: AuthUserService,
    public perfilSer: ProfileService,) {
    this.usuariosChatRefs = this.db.list('users').valueChanges();
  }

  async ngOnInit(): Promise<void> {
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      console.log('estoy en LOCAL STORAGE- CLIENTE:', this.usuarioBDatos);
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.usuarioBDatos);
    }
    this.chatSer.getUsers().valueChanges().subscribe(usuarios=>{
      this.users=usuarios.filter(user=>user.tipo!==this.usuarioBDatos.usuario.tipo)/* .filter(user=>{user.tipo!==this.usuarioBDatos.usuario.tipo, console.log(user.tipo)}) */
    })
  }

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  seleccionar(usuario:UsuarioFireBD){
    this.selecionUser.emit(usuario)
    console.log("este es el usuario", usuario)
    this.childView.cargarFeed(usuario)
    /* this.soyRemitente=usuario.email
    this.chatSer.remitente$.next(usuario.email)
    this.chatSer.esRemitente.subscribe(chat=>this.chatRemitente=chat)
    console.log(this.chatSer.remitente$.subscribe()) */
  }

}

