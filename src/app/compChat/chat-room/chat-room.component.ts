import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UsuarioFireBD } from 'src/app/domain/user';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scroller') private feedContainer: ElementRef;

 /*  userRef:  AngularFireObject<any>;
  public userDB:Observable<any>
  usuarioChat:UsuarioFireBD

  usuariosChatRef: AngularFireList<any>;
  usuariosChat: Observable<any[]>; */
  usuariosChatRefs: Observable<any[]>;
  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth, private chatSer:ChatService) {
    this.usuariosChatRefs = this.db.list('users').valueChanges();
  }

  async ngOnInit(): Promise<void> {
   /*  await this.afAuth.onAuthStateChanged((user) => {
      console.log(user.uid);
      const path = `/users/${user.uid}`;
      console.log(path);
      this.userRef= this.db.object(path)
      this.userDB=this.userRef.valueChanges()
      this.userDB.subscribe(user=>this.usuarioChat=user)
    });
    this.usuarios() */
  }

  /* usuarios(){
    this.usuariosChat =this.chatSer.getUsers().snapshotChanges().pipe(
      map(changes =>  changes.map(c =>  { key: c.payload.key }) )
    );
     this.chatSer.getUsers().snapshotChanges().subscribe(
      action => {
        console.log(action.values());}
    )
    console.log(this.usuarioChat)
    return this.usuarioChat
  }
 */

  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}

