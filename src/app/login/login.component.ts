import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators,FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario:FormGroup;
  
  constructor( public servicioUsuario: UsersService, public router: Router, private formularioFB: FormBuilder) {
    this.formulario = this.formularioFB.group({
      usuario:['',Validators.required],
      contrasenia:['',[Validators.required, Validators.minLength(4)]],
    })
   }

  ngOnInit(): void {

  }

  get usuario() {return this.formulario.get('usuario')}
  get contrasenia() {return this.formulario.get('contrasenia')}

  login() {
    this.servicioUsuario.logueado =true
    this.router.navigateByUrl('perfil');
    if (this.formulario.valid) {
      console.log(this.formulario.value)
    }
    else{
      alert("FILL ALL FIELDS")
    }
   /*  const user = {email: this.usuario, password: this.contrasenia};
    this.servicioUsuario.login(user).subscribe( data => {
      this.servicioUsuario.setToken(data.token);
      this.router.navigateByUrl('perfil');
    },
    error => {
      console.log(error);
    }
    ); */
  }
 
}
