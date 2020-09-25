import { Component, OnInit } from '@angular/core';
import { Usuario } from '../domain/user';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.serviceUser.angularAuth.user; //esta conectado o no
  usuario:User
  fotoUrl:string;
  actualizar: boolean;
  constructor(public serviceUser: AuthUserService) {
  }

  ngOnInit(): void {
    this.actualizar = false;
    this.cargarUser();
    this.foto()
  }

  modify() {
    this.actualizar = true;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  async cargarUser() {
    try {
     this.usuario = await this.serviceUser.usuario
    } catch (error) {
      console.log(error)
    }
  }

  async foto(){
    const usuario = await this.serviceUser.usuario
    try {
      if((usuario.photoURL)==null){
        this.fotoUrl= "../../assets/perfil01.jpg"
      }else{
      this.fotoUrl= this.usuario.photoURL}
    } catch (error) {
      console.log(error)
    }
  }
}
