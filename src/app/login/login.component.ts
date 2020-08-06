import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  contrasenia: string;
  users: any;

  constructor( public usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.usersService.createUser({
      name: "matias nuevo",
      job: "leader"
    });
    this.usersService.editUser({
      name: "matias edit",
      job: "zion resident"
    });
  }

  login() {
    console.log(this.usuario);
    console.log(this.contrasenia);
  }

}
