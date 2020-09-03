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
  /* openNav() {
   var x= document.getElementById("mySidebar")
  x.style.width = "180px";
  x.style.minWidth = "18%";
  var y =document.getElementById("main")
    y.style.display="none"
}

  closeNav() {
    var x =document.getElementById("mySidebar")
    var y =document.getElementById("main")
  x.style.width = "0";
  x.style.minWidth = "0";
  x.style.marginLeft= "0";
    y.style.display="flex" 
} */
}
