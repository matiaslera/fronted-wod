import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: string;
  contrasenia: string;
  users: any;
  condicion: boolean;

  constructor( public usersService: UsersService, public router: Router) {
    this.condicion= 2>1;
   }

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
    const user = {email: this.usuario, password: this.contrasenia};
    this.usersService.login(user).subscribe( data => {
      this.usersService.setToken(data.token);
      this.router.navigateByUrl('perfil');
    },
    error => {
      console.log(error);
    }
    );
  }

}
