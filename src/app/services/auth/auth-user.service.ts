import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public user: User;

  constructor(public afAuth: AngularFireAuth) {}

  async login(email: string, password: string) {
    try {
      const resultado = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithGoogle() {
    try {
      auth.GoogleAuthProvider;
    } catch (error) {
      console.log(error);
    }
  }

  async loginWithFacebook() {
    try {
      this.afAuth.currentUser;
      auth.FacebookAuthProvider;
    } catch (error) {
      console.log(error);
    }
  }

  async register(email: string, password: string) {
    try {
      const resultado = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }
  }
  getCurretUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }

  async deleteUser(credential){
    try {
      this.volverAutenticar(credential)
      var user = await this.userCurrent();
      user.delete();
    } catch (error) {
      console.log(error)
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

  async emailVerification() {
    try {
      var user = await this.userCurrent();
      user.sendEmailVerification();
    } catch (error) {
      console.log(error);
    }
  }
  

  async updateEmail(nuevoEmail: string, credential) {
    try {
      this.volverAutenticar(credential)
      var user = await this.userCurrent();
      user.updateEmail(nuevoEmail);
    } catch (error) {
      console.log(error);
    }
  }

  async updatePassword(nuevaContraseña: string,credential) {
    try {
      this.volverAutenticar(credential)
      var user = await this.userCurrent();
      user.updatePassword(nuevaContraseña);
    } catch (error) {
      console.log(error);
    }
  }

  async resetPassword(email:string){
    try {
      this.afAuth.sendPasswordResetEmail(email)
    } catch (error) {
      console.log(error);
    }
  }

  async userCurrent() {
    try {
      const user = this.afAuth.currentUser;
      return user;
    } catch (error) {
      console.log(error);
    }
  }
  async userActual() {
    try {
      this.afAuth.onAuthStateChanged(function (user) {
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

  async volverAutenticar(credencial:auth.AuthCredential){
    try {
      var user = await this.userCurrent();
      user.reauthenticateWithCredential(credencial)
    } catch (error) {
      console.log(error);
    }
  }
}
