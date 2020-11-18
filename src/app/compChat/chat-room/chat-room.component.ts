import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject, PathReference } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css'],
})
export class ChatRoomComponent implements OnInit {
  @ViewChild('scroller') private feedContainer: ElementRef;
  /* items: Observable<any[]>;
  constructor(db: AngularFireDatabase) {
    this.items = db.list('items').valueChanges();
  }
  itemRef: AngularFireObject<any>;
  item: Observable<any>;
  */
  userRef:  AngularFireObject<any>;
  public userDB:Observable<any>
  usuarioChat:UsuarioBD

  usuariosChatRef: AngularFireList<any>;
  usuariosChatRefs: Observable<any[]>;
  usuariosChat: Observable<any[]>;
  constructor(private db: AngularFireDatabase,private afAuth: AngularFireAuth, private chatSer:ChatService) {
  /*   this.itemRef = db.object('item');
    this.item = this.itemRef.valueChanges();
    console.log(this.itemRef.query) */
    this.usuariosChatRefs = this.db.list('users').valueChanges();
  }

  async ngOnInit(): Promise<void> {
    await this.afAuth.onAuthStateChanged((user) => {
      console.log(user.uid);
      const path = `/users/${user.uid}`;
      console.log(path);
      this.userRef= this.db.object(path)
      this.userDB=this.userRef.valueChanges()
      this.userDB.subscribe(user=>this.usuarioChat=user)
    });
    this.usuarios()
  }

  usuarios(){
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

  /* save(newName: string) {
    this.itemRef.set({ name: newName });
  }
  update(newSize: string) {
    this.itemRef.update({ size: newSize });
  }
  delete() {
    this.itemRef.remove();
  }
 */
  scrollToBottom(): void {
    this.feedContainer.nativeElement.scrollTop = this.feedContainer.nativeElement.scrollHeight;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
}

export class UsuarioBD{
  displayName:string
  email:string
  status:string
}
