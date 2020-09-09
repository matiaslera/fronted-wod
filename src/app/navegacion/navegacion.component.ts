import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AuthUserService } from '../services/auth/auth-user.service';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent implements OnInit {

  constructor(private servicioUsuario:UsersService, private authSvc:AuthUserService) { }

  ngOnInit(): void {
    console.log("ejecutando ando")
  }


 
}
