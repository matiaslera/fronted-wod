import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Calificacion, UserFB } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuarioBDatos:Calificacion// =this.perfilSer.usuarioBD
  usuarioFire:User
  actualizar: boolean = false;
  errors = [];
  constructor(public authServ: AuthUserService,public perfilSer: ProfileService, private snackBar: MatSnackBar) {
    if(this.authServ.getTipo()==="CLIENTE"){
      this.usuarioBDatos =this.authServ.getCurrentCliente()
      console.log("estoy en LOCAL STORAGE- CLIENTE:",this.usuarioBDatos)
    }
    if(this.authServ.getTipo()==="PROFESIONAL"){
      this.usuarioBDatos =this.authServ.getCurrentProfesional()
      console.log("estoy en LOCAL STORAGE- CLIENTE:",this.usuarioBDatos)
    }
  }

   ngOnInit():void {
    //this.usuarioFB=this.perfilSer.usurioFB
    
    /* if(this.authServ.getTipo()==="CLIENTE"){
      this.usuarioBDatos =this.authServ.getCurrentCliente()
      console.log("estoy en LOCAL STORAGE- CLIENTE:",this.usuarioBDatos)
    }
    if(this.authServ.getTipo()==="PROFESIONAL"){
      this.usuarioBDatos =this.authServ.getCurrentProfesional()
      console.log("estoy en LOCAL STORAGE- CLIENTE:",this.usuarioBDatos)
    } */
    //this.usuarioBDatos=this.perfilSer.usuarioBD
    console.log(this.usuarioBDatos)
  }

  modify() {
    this.actualizar = true;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  foto():boolean{
    if(this.usuarioBDatos.usuario){
      return false
    }
    return this.usuarioBDatos.usuario.fotoUrl!==null 
  /*   if (this.authServ.usuario.photoURL===null){
      return false
    }
    return true */
  }
}

export const urlLocal= "../../assets/perfil01.jpg"