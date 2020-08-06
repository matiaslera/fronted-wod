import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  password: string;

  constructor( public usersService: UsersService) { }

  ngOnInit(): void {
  }

  login() {
    console.log(this.usuario);
    console.log(this.password);
  }

}
