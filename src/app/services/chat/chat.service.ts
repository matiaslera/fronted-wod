import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';
import { ChatMessage } from 'src/app/domain/chat';
import { Jugador } from 'src/app/domain/jugador';
import { map } from 'rxjs/operators';
import { Usuario, UsuarioFireBD } from 'src/app/domain/user';
import { User } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  user: User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: Observable<string>;
  userID: string;

  private jugadoresDB: AngularFireList<Jugador>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    //? Accedemos a la base de datos de firebase.
    //? Vamos a acceder la lista de jugadores en la db.
    //? y se implementa la funcionalidad en el segundo argumento.
    //? La referencia que es nuestra lista de jugadores, se va a ordenar por nombre.
    //this.jugadoresDB = this.db.list('/jugadores', (ref) => ref.orderByChild('nombre'));
   this.chatMessages = this.db.list('/mensajes',ref => ref.limitToLast(25).orderByKey())
    this.cargarUser();
    console.log(this.userID);
    this.getUser();
    console.log(this.getUsers().stateChanges());
  }

  getUser() /* :AngularFireObject<Usuario>  */ {
    const path = `/users/${this.userID}`;
    console.log(path);
    return this.db.object(path);
  }

  async cargarUser() {
    await this.afAuth.onAuthStateChanged((user) => {
      console.log(user.uid);
      this.userID = user.uid;
      console.log(this.userID);
      console.log(user.providerId);
      console.log(user.email);
      console.log(user.displayName);
      console.log(user.photoURL);
      const path = `/users/${this.userID}`;
      console.log(path);
      this.db.object(path).snapshotChanges().subscribe(
        action => {
          console.log(action.type);
          console.log(action.key)
          console.log(action.payload.val())}
      )
    });
    console.log(this.userID);
  }

  getUsers():AngularFireList<UsuarioFireBD> {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    this.afAuth.onAuthStateChanged(user=>{
      const timestamp = this.getTimeStamp();
     // const email = this.user.email;
      //this.chatMessages = this.getMessages();
       this.chatMessages.push({
        message: msg,
        timeEnvio: timestamp,
        userName: user.displayName,
        email: user.email 
       });
    })
  }

  getMessages(): AngularFireList<ChatMessage> {
    // query to create our message feed binding
    return this.db.list('/mensajes' ,ref => ref.limitToLast(25).orderByKey());
  }

  getTimeStamp() {
    const now = new Date();
    const date =
      now.getFullYear() +'/' +
      (now.getMonth() + 1) +'/' +now.getDate();
    const time =now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    return date + ' ' + time;
  }

  /*  //Devuelve un Observable de tipo Jugador Array.
   getJugadores(): Observable<Jugador[]> {
    //? this.jugadoresDB ya tiene la base de datos.
    //? snapshotChanges obtiene la informacion en este momento.
    //? Obtiene los datos junto con la Key
    //? Con Pipe permite hacer modificaciones
    //? Con Map haremos un cambio, que por cada uno de los jugadores retornaremos la informacion,
    //? y se Agregue una Key.
    //? El formato de key siempre es $key.
    //? Payload es por donde esta viajando la data.
    //?A veces hay que importar map manualmente de rsjs/operators
    return this.jugadoresDB.snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  //Metodo para crear un nuevo jugador en la DB
  addJugador(jugador: Jugador) {
    //?Con esto FireBase se encarga de todo,
    //?no hay que pensar en endpoints o si esta o no creada la tabla.
    //?Adicionamos un nuevo record a la tabla.
    return this.jugadoresDB.push(jugador);
  }

  //Borrar un Jugador de la DB
  deleteJugador(id: string) {
    //? Que base de datos afectaremos? Jugadores.
    //? El id del jugador que deseamos eliminar.
    this.db.list('/jugadores').remove(id);
  }

  //Editar un Jugador
  editJugador(newJugadorData) {
    //? Salvamos el Key.
    //? Eliminamos el registro anterior con el Key.
    //? Nuevamente asignamos a ese registro la nueva información en la base de datos.
    //? FireBase no acepta que ya se contenga una Key, por eso se hizo la Key opcional.
    //? Al borrar o actualizar daria problema sino fuera opcional.
    const $key = newJugadorData.$key;
    delete newJugadorData.$key;
    this.db.list('/jugadores').update($key, newJugadorData);
  }*/
}
