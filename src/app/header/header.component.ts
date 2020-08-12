import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor( private servicioUsuario:UsersService, public router: Router) {  
  }

  ngOnInit(): void {
    this.userIsLogged()
  }

  userIsLogged():boolean{
    return this.servicioUsuario.logueado
  }

  exit(){
    this.servicioUsuario.logueado =false
    this.userIsLogged()
    this.router.navigateByUrl('ingresar');
  }
}
