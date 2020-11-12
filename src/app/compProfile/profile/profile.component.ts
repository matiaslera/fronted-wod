import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { Calificacion, UserFB } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user$: Observable<any> = this.authServ.angularAuth.user; //esta conectado o no
  usuarioBDatos: Calificacion; // =this.perfilSer.usuarioBD
  usuarioFire: User;
  actualizar: number = 0;
  errors = [];
  constructor(
    public authServ: AuthUserService,
    public perfilSer: ProfileService,
  ) {}

  async ngOnInit(): Promise<void> {
    if (this.authServ.getTipo() === 'CLIENTE') {
      //this.usuarioBDatos = this.authServ.getCurrentCliente();
      this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
      this.foto();
      console.log('estoy en LOCAL STORAGE- CLIENTE:', this.usuarioBDatos);
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
     // this.usuarioBDatos = this.authServ.getCurrentProfesional();
     this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.usuarioBDatos);
    }
    console.log(this.usuarioBDatos);
  }

  modify() {
    this.actualizar = 2;
  }

  verDato() {
    this.actualizar = 1;
  }

  cancel(condicion) {
    this.actualizar = condicion;
  }

  foto(): boolean {
    /* if (this.usuarioBDatos.usuario) {
      return false;
    } */
    console.log(this.usuarioBDatos.usuario.fotoUrl)
    return this.usuarioBDatos.usuario.fotoUrl !== null;
    /*   if (this.authServ.usuario.photoURL===null){
      return false
    }
    return true */
  }

  async updateDatos(event) {
    console.log(event);
    if (event === 'listo') {
      console.log("entre a updatear")
      if (this.authServ.getTipo() === 'CLIENTE') {
        //this.usuarioBDatos = this.authServ.getCurrentCliente();
        this.usuarioBDatos = await this.perfilSer.getIdCliente(parseInt(this.authServ.getId(),10)) ;
        console.log(this.usuarioBDatos)
      }
      if (this.authServ.getTipo() === 'PROFESIONAL') {
       // this.usuarioBDatos = this.authServ.getCurrentProfesional();
       this.usuarioBDatos = await this.perfilSer.getIdProfesional(parseInt(this.authServ.getId(),10))
       console.log(this.usuarioBDatos)
      }
    } else {
      console.log(event);
    }
  }
}

export const urlLocal = '../../assets/perfil01.jpg';
