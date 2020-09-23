import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from 'src/app/domain/user';
import { Router } from '@angular/router';
import { isUndefined, isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public logueado: boolean;
  public tecnico: boolean;
  public cliente: boolean;

  constructor(public angularAuth: AngularFireAuth, private router: Router) {
    this.logueado = false;
    this.tecnico = false;
    this.cliente = false;
  }

  async login(email: string, password: string) {
    try {
      if (this.angularAuth.currentUser) {
        this.angularAuth.signOut();
      }
      await this.angularAuth.signInWithEmailAndPassword(email, password);
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

  async register(email: string, password: string) {
    try {
      await this.angularAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        alert('The password es demasiado debil.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
    }
  }

  async sendEmailVerification() {
    try {
      await (await this.angularAuth.currentUser).sendEmailVerification();
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
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
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

  async logOut() {
    try {
      await this.angularAuth.signOut();
      this.logueado = false;
    } catch (error) {
      console.log(error);
    }
  }
  getCurretUser() {
    return this.angularAuth.authState.pipe(first()).toPromise();
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
    try {
      var user = await this.userCurrent();
      user.updateProfile({
        displayName: nombre,
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
          // ...
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
}
