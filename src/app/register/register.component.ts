import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  usuario:string;
  contrasenia: string;
  confirmarContrasenia: string;
  passwordError: boolean;

  constructor(public servicioUsuario: UsersService) {}

  ngOnInit(): void {
  }

  register() {
      const user = { email: this.email, password: this.contrasenia };
    this.servicioUsuario.register(user).subscribe(data => {
      this.servicioUsuario.setToken(data.token);
    });
  }

}
