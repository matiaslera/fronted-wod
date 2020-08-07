import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {
  }

  register() {
    console.log(this.email);
    console.log(this.usuario);
    console.log(this.contrasenia);
    console.log(this.confirmarContrasenia);
  }

}
