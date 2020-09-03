import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(private servicioUsuario:UsersService) { }

  ngOnInit(): void {
  }

  userIsLogged():boolean{
    return this.servicioUsuario.logueado
  }
 
}
