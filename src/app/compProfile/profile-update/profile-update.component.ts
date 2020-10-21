import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Tipo } from 'src/app/domain/user';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  @Output() cancelar = new EventEmitter<boolean>();
  cliente: Cliente= new Cliente()
  profesional: Profesional= new Profesional()
  formulario: FormGroup = this.formularioFB.group(
    {
      usuario: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['',[Validators.required, Validators.minLength(4)],],
    },
  );

  formulario2: FormGroup = this.formularioFB.group(
    {
      nacionalidad: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      nacimiento: ['', [Validators.required]],
    },
  );

  constructor(private formularioFB: FormBuilder,public perfilSer: ProfileService) { }

  ngOnInit(): void {
    if(this.perfilSer.cliente){
      this.cliente=new Cliente()
      this.cliente=this.perfilSer.usuarioBD
      console.log(this.cliente)
    }
    if(this.perfilSer.profesional){
      this.profesional= new Profesional()
      this.profesional=this.perfilSer.usuarioBD
      console.log(this.profesional)
    }
  }

  get nacionalidad() {
    return this.formulario2.get('nacionalidad');
  }
  get telefono() {
    return this.formulario2.get('telefono');
  }
  get nacimiento() {
    return this.formulario2.get('nacimiento');
  }
  get contrasenia() {
    return this.formulario.get('contrasenia');
  }
  
  updateDireccion(){
    console.log("actualizando direccion")
  }

  updateDato(){
    if(this.perfilSer.usuarioBD.usuario.tipo===Tipo.CLIENTE){
      console.log("antes",this.cliente)
      this.cliente.usuario.nacionalidad=this.formulario2.get('nacionalidad').value
      this.cliente.usuario.fechaDeNacimiento=this.formulario2.get('nacimiento').value
      this.cliente.usuario.telefono=this.formulario2.get('telefono').value
      this.perfilSer.actualizarCliente(this.cliente)
      console.log("despues",this.cliente)
    }
    if(this.perfilSer.usuarioBD.usuario.tipo===Tipo.PROFESIONAL){
      console.log("antes",this.profesional)
      this.profesional.usuario.nacionalidad=this.formulario2.get('nacionalidad').value
      this.profesional.usuario.fechaDeNacimiento=this.formulario2.get('nacimiento').value
      this.profesional.usuario.telefono=this.formulario2.get('telefono').value
      this.perfilSer.actualizarProfesional(this.profesional)
      console.log("despues",this.profesional)
    }
    console.log("actualizando datos")
  }

  cancel(){
    
  }

  onSubmit() {
    var act = document.activeElement.id;
    console.log(document.activeElement.id);
    if (act == 'btn1') {
      alert('you have clicked on submit 1');
     // this.registerClient();
    }
    if (act == 'btn2') {
     // this.registerProf();
      alert('you have clicked on submit 2');
    }
  } 
}
