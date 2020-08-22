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
/* Set the width of the sidebar to 250px (show it) */
  openNav() {
   var x= document.getElementById("mySidebar")
  x.style.width = "180px";
  x.style.minWidth = "18%";
  /* x.style.marginLeft = "200px"; */
  var y =document.getElementById("main")
    y.style.display="none"
}

/* Set the width of the sidebar to 0 (hide it) */
  closeNav() {
    var x =document.getElementById("mySidebar")
    var y =document.getElementById("main")
  x.style.width = "0";
  x.style.minWidth = "0";
  x.style.marginLeft= "0";
    y.style.display="flex" 
}
}
