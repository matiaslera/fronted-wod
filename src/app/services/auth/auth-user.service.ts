import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User, auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public tecnico: boolean;
  public cliente: boolean;
  usuario: User =null;

  constructor(public angularAuth: AngularFireAuth) {
    this.tecnico = false;
    this.cliente = false;
  }

  async login(email: string, password: string) {
    try {
      if (this.angularAuth.currentUser) {
        this.angularAuth.signOut(); }
      const user = await this.angularAuth.signInWithEmailAndPassword( email, password);
      this.usuario = null;
      this.usuario =  user.user;
    } catch (error) {
      console.log(error);
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Contraseña incorrecta.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  }

  async register(email: string, password: string,name:string) {
    try {
      const user = await this.angularAuth.createUserWithEmailAndPassword( email, password);
      this.updateName(name)
      this.usuario = user.user;
      console.log("este es el usuario",this.usuario)
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
      await this.angularAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(credential) {
    try {
      this.volverAutenticar(credential);
      var user = await this.userCurrent();
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
      if (!isNullOrUndefined(this.angularAuth.user)) {
        /*Accedo con popup*/
        var provider = new auth.GoogleAuthProvider();
        provider.addScope('profile');
        provider.addScope('email');
        const resultado = this.angularAuth.signInWithPopup(provider);
        this.usuario = null;
        this.usuario = (await resultado).user;
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
      var user = await this.userCurrent();
      user.updateEmail(nuevoEmail);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(nuevaContraseña: string, credential) {
    try {
      this.volverAutenticar(credential);
      var user = await this.userCurrent();
      user.updatePassword(nuevaContraseña);
    } catch (error) {
      console.log(error);
    }
  }

  getCurretUser() {
    return this.angularAuth.authState.pipe(first()).toPromise();
  }

  async userCurrent() {
    try {
      return this.angularAuth.currentUser;
    } catch (error) {
      console.log(error);
    }
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
      var user = await this.userCurrent();
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
}
