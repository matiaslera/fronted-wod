import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { auth } from 'firebase/app';
import { User } from 'firebase';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  public usuario: User;
  public logueado: boolean;

  constructor(public afAuth: AngularFireAuth) {
    this.logueado = false;
  }

  async login(email: string, password: string) {
    try {
      if (auth().currentUser) {
        auth().signOut();
      }
      await auth().signInWithEmailAndPassword(email, password);
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
      await this.afAuth.createUserWithEmailAndPassword(email, password);
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
      await auth().currentUser.sendEmailVerification();
      alert('Email de Verificacion enviado!');
    } catch (error) {
      console.log(error);
    }
  }
  async sendPasswordReset(email: string) {
    try {
      await auth().sendPasswordResetEmail(email);
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
      auth().onAuthStateChanged(function (user) {
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
      await this.afAuth.signOut();
      this.logueado = false;
    } catch (error) {
      console.log(error);
    }
  }
  getCurretUser() {
    return this.afAuth.authState.pipe(first()).toPromise();
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
      if (!auth().currentUser) {
        /*Accedo con popup*/
        var provider = new auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
      /*   var a = provider.addScope(
          'https://www.googleapis.com/auth/contacts.readonly'
        ); */
        var b = provider.addScope('profile');
        var c = provider.addScope('email');
        
        const result = auth().signInWithPopup(provider);
        var token = (await result).credential; //.accessToken;
        // The signed-in user info.
        var user = (await result).user;
        console.log('token:', token);
        console.log('user:', user);
        /* console.log('proveedor contacto:', a); */
        console.log('proveedor perfil :', b);
        console.log('proveedor email:', c);
      } else {
        await auth().signOut();
      }
      /*Acceder por google*/

      //id del provedor
      provider.providerId;
      console.log('proveedor id', provider.providerId);
      //provedor de los parametros
      /* provider.setCustomParameters() */
      const resultado = this.afAuth.signInWithPopup(provider);
      //Devuelve el user final
      var usuarioLoguedo = (await resultado).user;
      //le asigno un usuario del proveedor
      this.usuario = null;
      this.usuario = usuarioLoguedo;
      console.log('este es el usuario angular:', this.afAuth.user);
      var user1 = (await resultado).user.displayName;
      console.log('user1', user1);
      var user2 = (await resultado).user.email;
      console.log('user2', user2);
      var user3 = (await resultado).user.emailVerified;
      console.log('user3', user3);
      var user4 = (await resultado).user.isAnonymous;
      console.log('user4', user4);
      var user5 = (await resultado).user.metadata;
      console.log('user5', user5);
      var user6 = (await resultado).user.multiFactor;
      console.log('user6', user6);
      var user7 = (await resultado).user.phoneNumber;
      console.log('user7', user7);
      var user8 = (await resultado).user.photoURL;
      console.log('user8', user8);
      var user9 = (await resultado).user.providerData;
      console.log('user9', user9);
      var user10 = (await resultado).user.providerId;
      console.log('user10', user10);
      var user11 = (await resultado).user.refreshToken;
      console.log('user11', user11);
      var user12 = (await resultado).user.tenantId;
      console.log('user12', user12);
      var user13 = (await resultado).user.uid;
      console.log('user13', user13);
      //OPERACIONTYPE Tengo muchas operaciones
      //devuelve la cantidad de letra que tiene
      var operacion = (await resultado).operationType.length;
      console.log('operacion', operacion);
      //convierte todo en string
      var operacion2 = (await resultado).operationType.toString();
      console.log('operacion2', operacion2);
      //La autenticacion propuesta por google o facebook
      var credencial1 = (await resultado).credential.providerId;
      console.log('credencial1', credencial1);
      //La autenticacion como el metodo de identificar el email o password
      var credencial2 = (await resultado).credential.signInMethod;
      console.log('credencial2', credencial2);
      //Devuelve el json de las credenciales
      var credencial3 = (await resultado).credential.toJSON();
      console.log('credencial3', credencial3);
      //Devuelve un booleano si es un nuevo usuario
      var info = (await resultado).additionalUserInfo.isNewUser;
      console.log('info', info);
      //Devuelve un objecto si es un usuario
      var info2 = (await resultado).additionalUserInfo.profile;
      console.log('info2', info2);
      //Devuelve un string de la id del usuario
      var info3 = (await resultado).additionalUserInfo.providerId;
      console.log('info3', info3);
      //Devuelve un string del nombre  del usuario
      var info4 = (await resultado).additionalUserInfo.username;
      console.log('info4', info4);
      /*Accesos mediante el redirecionamiento*/
      this.logueado = true;
      return resultado;
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
      this.afAuth.currentUser;
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
      const user = auth().currentUser;
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

  async volverAutenticar(credencial: auth.AuthCredential) {
    try {
      var user = await this.userCurrent();
      user.reauthenticateWithCredential(credencial);
    } catch (error) {
      console.log(error);
    }
  }
}
