import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reg-prof',
  templateUrl: './reg-prof.component.html',
  styleUrls: ['./reg-prof.component.css']
})
export class RegProfComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    public servicioUsuario: UsersService,
    private formularioFB: FormBuilder,
    public router: Router
  ) {
    this.formulario = this.formularioFB.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      dni: ['', Validators.required],
      fec_nacim:'',
      telefono: '',
      genero: '',
      foto:'',
    });
  }

  ngOnInit(): void {}

  get nombre() {
    return this.formulario.get('nombre');
  }
  get apellido() {
    return this.formulario.get('apellido');
  }
  get dni() {
    return this.formulario.get('dni');
  }
  get contrasenia() {
    return this.formulario.get('contrasenia');
  }

  reset_foto(){
    this.formulario.patchValue({
      foto: '',
    });
  }
  
  acept(){
    console.log(this.formulario.value)
  }

  cancel(){
    this.router.navigateByUrl('registrar');
  }
}
