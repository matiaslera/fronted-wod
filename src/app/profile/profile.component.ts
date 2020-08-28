import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  nombre: string;
  apellido: string;
  user:string;
  direccion: string;
  telefono:number;
  email:string;

  constructor(public servicioUsuario: UsersService) { }

  ngOnInit(): void {
    this.getUserLogged()
    this.init()
  }

  getUserLogged() {
    this.servicioUsuario.getUser().subscribe(user => {
      console.log(user);
    });
  }

  init(){
    this.nombre= "Omar";
  this.apellido="Castillo";
  this.user="omar_castillo_20"
  this.direccion="av siempre viva"
  this.telefono= 15423589
  this.email= "omarcastio20@gmail.com"
  }

}
