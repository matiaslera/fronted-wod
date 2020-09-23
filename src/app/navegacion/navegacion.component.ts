import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {
  public user$: Observable<any> = this.user.angularAuth.user;
  cliente: boolean;
  tecnico: boolean;
  constructor(private user: AuthUserService) {
    this.cliente = this.user.cliente;
    this.tecnico = this.user.tecnico;
  }

  ngOnInit(): void {
    console.log('ejecutando ando');
    this.typeUser();
  }

  async typeUser() {
    try {
      if (this.user$) {
        this.cliente = this.user.cliente;
        this.tecnico = this.user.tecnico;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
