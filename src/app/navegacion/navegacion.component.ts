import { Component, OnInit } from '@angular/core';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/perfil/profile.service';


@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css'],
})
export class NavegacionComponent implements OnInit {
  public user$: Observable<any> = this.user.angularAuth.user;
  esCliente: Observable<boolean> = this.perfilSer.esCliente
  esTecnico:Observable<boolean> = this.perfilSer.esProfesional
  errors = [];
  constructor(private user: AuthUserService,public perfilSer: ProfileService) {
  }

  ngOnInit(): void {
    this.perfilSer.cliente.next(this.user.getTipo()==="CLIENTE")
    this.perfilSer.profesional.next(this.user.getTipo()==="PROFESIONAL")
    console.log("cliente: ",this.esCliente)
    console.log("profesional: ",this.esTecnico)
  }

}
