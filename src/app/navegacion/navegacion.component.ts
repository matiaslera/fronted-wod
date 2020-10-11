import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';
import { ProfileService } from '../services/perfil/profile.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {
  public user$: Observable<any> = this.user.angularAuth.user;
  cliente: boolean=false
  tecnico: boolean=false
  constructor(private user: AuthUserService,public perfilSer: ProfileService) {
  }

  ngOnInit(): void {
    console.log('ejecutando ando');
    this.typeUser();
  }

  async typeUser() {
    try {
      if (this.user$ && this.perfilSer.esCliente) {
        this.cliente = true
      }
      if (this.user$ && this.perfilSer.esProfesional){
        this.tecnico=true
      }
    } catch (error) {
      console.log(error);
    }
  }
}
