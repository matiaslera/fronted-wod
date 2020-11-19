import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User, auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { Tipo, Usuario } from 'src/app/domain/user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {

  private userState: Observable<User|null>;
  private userFire: User;

  constructor(public angularAuth: AngularFireAuth,
    private db: AngularFireDatabase,private snackBar: MatSnackBar) { 
      this.userState = angularAuth.authState;
  }

  get currentUserId(): string {
    return this.userFire !== null ? this.userFire.uid : '';
  }

  async login(email: string, password: string) {
    try {
      const user= this.angularAuth.signInWithEmailAndPassword(email, password)
        this.userFire = (await user).user
        this.setUserStatus('online');
        this.setOnline("online")
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      if (errorCode === 'auth/wrong-password') {
        this.mensaje('Usuario o contraseña incorrecta.');
        alert('Usuario o contraseña incorrecta.')
      } 
      if(errorCode ==="auth/user-not-found"){
        this.mensaje('Usuario o contraseña incorrecta.');
        alert('Usuario o contraseña incorrecta.')
      }
      else {
        this.mensaje('Usuario o contraseña incorrecta.');
      }
    }
  }
  
  async register(email: string, password: string,name:string,tipo:Tipo) {
    try {
      const user= this.angularAuth.createUserWithEmailAndPassword( email, password)
      this.userFire = (await user).user
      const status = 'online';
      this.setUserData(email, name, status,tipo);
      this.updateName(name)
      console.log("este es el usuario", this.userFire)
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        this.mensaje('La password es demasiado debil.');
      }if (errorCode == "auth/network-request-failed"){
        this.mensaje('Error, no tenemos conexion con el servidor')
      }
      if(errorCode="auth/email-already-in-use"){
        this.mensaje('Ingrese sus datos nuevamente, para logearse')
      }
      else {
        this.mensaje(errorMessage);
      }
      console.log(error);
    }
  }
  
  setUserStatus(status: string): void {
    this.angularAuth.onAuthStateChanged(user=>{
      if(user){
        const path = `users/${user.uid}`;
        const data = { status: status};
        this.db.object(path).update(data)
          .catch(error => console.log(error));
      }
    })
  }
  setUserData(email: string, displayName: string, status: string,tipo:Tipo): void {
    const path = `users/${this.currentUserId}`;
    const data = {email: email,
      displayName: displayName,
      tipo:tipo,
      status: status };
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  async logOut() {
    try {
    localStorage.removeItem("calificacion");
    localStorage.removeItem("id");
    this.setOnline("off")
    this.setUserStatus("offline")
    await this.angularAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  
  async updateName(nombre: string) {
    const user=await this.angularAuth.currentUser
    try {
      user.updateProfile({
        displayName:nombre
      });
    } catch (error) {
      console.log(error);
    }
  }
  async loginWithGoogle() {
    try {
      if (this.angularAuth.user !== null && this.angularAuth.user !== undefined ) {
        var provider = new auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const resultado = this.angularAuth.signInWithPopup(provider);
        this.setOnline("online")
        console.log('nombre del usuario', (await resultado).user.displayName);
        console.log('email del usuario', (await resultado).user.email);
        console.log('email verificado', (await resultado).user.emailVerified);
        console.log('provider Id es:', (await resultado).user.providerId);
        console.log('id unica del usuario:', (await resultado).user.uid);
      } else { this.angularAuth.signOut();}
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage)
      if (errorCode === 'auth/wrong-password') {
        this.mensaje('Usuario o contraseña incorrecta.');
        alert('Usuario o contraseña incorrecta.')
      } 
      if(errorCode ==="auth/user-not-found"){
        this.mensaje('Usuario o contraseña incorrecta.');
        alert('Usuario o contraseña incorrecta.')
      }
      else {
        this.mensaje('Usuario o contraseña incorrecta.');
      }
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    }
  }
  
  async loginWithFacebook() {
    try {
      this.angularAuth.currentUser;
      auth.FacebookAuthProvider;
    } catch (error) {
      console.log(error);
    }
  }

  async sendEmailVerification() {
    try {
      (await this.angularAuth.currentUser).sendEmailVerification();
      alert('Email de Verificacion enviado!');
    } catch (error) {
      console.log(error);
    }
  }
  async sendPasswordReset(email: string) {
    try {
      await this.angularAuth.sendPasswordResetEmail(email);
      alert('Correo electrónico de restablecimiento de contraseña enviado!');
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/invalid-email') {
        alert("La direccion de email esta mal escrita");
      } else if (errorCode == 'auth/user-not-found') {
        alert("El usuario no fue encontrado, reintente");
      }
      console.log(error);
    }
  } 

  /*   async deleteUser(credential) {
      try {
        this.volverAutenticar(credential);
        var user = await this.angularAuth.currentUser;
        user.delete();
      } catch (error) {
        console.log(error);
      }
    } 

/*   async updateEmail(nuevoEmail: string, credential) {
    try {
      this.volverAutenticar(credential);
      var user = await this.angularAuth.currentUser;
      user.updateEmail(nuevoEmail);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(nuevaContraseña: string, credential) {
    try {
      this.volverAutenticar(credential);
      var user = await this.angularAuth.currentUser;
      user.updatePassword(nuevaContraseña);
    } catch (error) {
      console.log(error);
    }
  }

  async volverAutenticar(credencial: auth.AuthCredential) {
    try {
      var user = await this.angularAuth.currentUser;
      user.reauthenticateWithCredential(credencial);
    } catch (error) {
      console.log(error);
    }
  }
 */

  setOnline(online:string){
    localStorage.setItem("online", online);
  }
  setId(id:string){
    localStorage.setItem("id", id);
  }
  setTipo(token: string): void {
    localStorage.setItem("calificacion", token);
  }
  getTipo() {
    return localStorage.getItem("calificacion");
  }
  getId(){
    return localStorage.getItem("id");
  }

  getOnline(){
    return localStorage.getItem("online");
  }

  rememberMe(user: Usuario, recordarme: boolean): void {
    if (recordarme) {
      let user_string = JSON.stringify(user);
      localStorage.setItem("rememberMe", user_string);
    } else {
      localStorage.removeItem("rememberMe");
    }
  }
  getRememberMe(): Usuario {
    let user_string = localStorage.getItem("rememberMe");
    if (user_string != null && user_string != undefined) {
      let user: Usuario = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 5000,
    });
  }
}
