import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User, auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Usuario } from 'src/app/domain/user';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {

  private user: Observable<firebase.User>;
  private authState: any;

  constructor(public angularAuth: AngularFireAuth,
    private db: AngularFireDatabase,private snackBar: MatSnackBar) { 
      this.user = angularAuth.authState;
  }

  get currentUserId(): string {
    return this.authState !== null ? this.authState.uid : '';
  }

  authUser() {
    return this.user;
  }

  async login(email: string, password: string) {
    try {
      return this.angularAuth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.setUserStatus('online');
      });
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        this.mensaje('Usuario o contraseña incorrecta.');
      } 
      if(errorCode ==="auth/user-not-found"){
        this.mensaje('Usuario o contraseña incorrecta.');
      }
      else {
        this.mensaje(errorMessage);
      }
      console.log(error);
    }
  }

  setUserStatus(status: string): void {
    const path = `users/${this.currentUserId}`;
    const data = { status: status};
    this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  async register(email: string, password: string,name:string) {
    try {
      const user = await this.angularAuth.createUserWithEmailAndPassword( email, password);
      this.updateName(name)
      //this.usuario = user.user;
      //console.log("este es el usuario",this.usuario)
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('La password es demasiado debil.');
      }if (errorCode == "auth/network-request-failed"){
        alert('Error, no tenemos conexion con el servidor')
      }
       else {
        alert(errorMessage);
      }
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

  async logOut() {
    try {
    localStorage.removeItem("calificacion");
    localStorage.removeItem("currentProfesional");
    localStorage.removeItem("currentCliente");
    localStorage.removeItem("id");
    await this.angularAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(credential) {
    try {
      this.volverAutenticar(credential);
      var user = await this.angularAuth.currentUser;
      user.delete();
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
        /*Accedo con popup*/
        var provider = new auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const resultado = this.angularAuth.signInWithPopup(provider);
        //this.usuario = null;
        //this.usuario = (await resultado).user;
        // The signed-in user info
        console.log('nombre del usuario', (await resultado).user.displayName);
        console.log('email del usuario', (await resultado).user.email);
        console.log('email verificado', (await resultado).user.emailVerified);
        console.log('provider Id es:', (await resultado).user.providerId);
        console.log('id unica del usuario:', (await resultado).user.uid);
      } else {
        await this.angularAuth.signOut();
      }
      /*Acceder por google*/
      console.log('proveedor id', provider.providerId); // google.com
    } catch (error) {
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

  async updateEmail(nuevoEmail: string, credential) {
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

  getCurretUser() {
    return this.angularAuth.authState.pipe(first()).toPromise();
  }

  async userActual() {
    try {
      this.angularAuth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
        } else {
          console.log('esta sin entrar');
        }
      });
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

  async initApp() {
    try {
      this.angularAuth.onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          var displayName = user.displayName;
          var email = user.email;
          var emailVerified = user.emailVerified;
          var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
          console.log('Nombre:', displayName);
          console.log('Email:', email);
          console.log('Email verificado:', emailVerified);
          console.log('Foto:', photoURL);
          console.log('Es anonimo:', isAnonymous);
          console.log('Uid :', uid);
          console.log('Provedor:', providerData);
        }
      });
    } catch (error) {}
  }

 setCliente(user: Cliente): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentCliente", user_string);
  }
  setProfesional(user: Profesional): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentProfesional", user_string);
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
  getCurrentCliente(): Cliente {
    let user_string = localStorage.getItem("currentCliente");
    if (user_string != null && user_string != undefined) {
      let user: Cliente = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }
  getCurrentProfesional(): Profesional {
    let user_string = localStorage.getItem("currentProfesional");
    if (user_string != null && user_string != undefined) {
      let user: Profesional = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
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
      duration: 3000,
    });
  }
/*
    return this.authService
        .login(this.formGroup.value)
        .subscribe(
          data => {
            this.authService.setUser(data.username);
            this.authService.setToken(data.id);
            this.authService.rememberMe(data.username, this.recordarme)
            this.authService.onLogin();
            this.isError = false;
          },
          message => {
            if (message.status === 0) {
              this.errorMessage = "Error de conexion con el servidor"
            } else {
              this.errorMessage = message.error
            }
            this.onIsError()
          }
        );
    } else {
      this.formSubmitIntento = true
    }
 */
}
