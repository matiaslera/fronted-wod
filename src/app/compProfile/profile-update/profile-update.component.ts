import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Calificacion, Tipo, Usuario } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  @Input() actualizar:number
  @Output() cancelar = new EventEmitter<boolean>();
  usuarioBD:Calificacion
  userUpdate:Usuario = new Usuario()
  cliente: Cliente= new Cliente()
  profesional: Profesional= new Profesional()
  formDomicilio: FormGroup = this.formularioFB.group(
    {
      usuario: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['',[Validators.required, Validators.minLength(4)],],
    },
  );

  formDatos: FormGroup = this.formularioFB.group(
    {
      nacionalidad: ['', Validators.required],
      telefono: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      nacimiento: [''],
      dni: [''],
    },
  );

  constructor(public authServ: AuthUserService,private formularioFB: FormBuilder,public perfilSer: ProfileService) { }

  ngOnInit(): void {
    if(this.authServ.getTipo()==="CLIENTE"){
      this.usuarioBD =this.authServ.getCurrentCliente()
      console.log("estoy en LOCAL STORAGE- CLIENTE:",this.usuarioBD)
    }
    if(this.authServ.getTipo()==="PROFESIONAL"){
      this.usuarioBD =this.authServ.getCurrentProfesional()
      console.log("estoy en LOCAL STORAGE- PROFESIONAL:",this.usuarioBD)
    }
  }

  get nacionalidad() {
    return this.formDatos.get('nacionalidad');
  }
  get telefono() {
    return this.formDatos.get('telefono');
  }
  get nacimiento() {
    return this.formDatos.get('nacimiento');
  }
  get dni() {
    return this.formDatos.get('dni');
  }
  
  updateDireccion(){
    console.log("actualizando direccion")
  }

  async updateDato(){
      console.log("antes",this.usuarioBD)
      this.userUpdate.nacionalidad=this.formDatos.get('nacionalidad').value
      this.userUpdate.fechaDeNacimiento=this.formDatos.get('nacimiento').value
      this.userUpdate.telefono=this.formDatos.get('telefono').value
      this.userUpdate.dni=this.formDatos.get('dni').value
      if(this.authServ.getTipo()==="CLIENTE"){
        this.cliente=new Cliente()
        /* this.cliente=this.usuarioBD */
        console.log(this.userUpdate.fechaDeNacimiento)
        this.cliente.usuario=this.userUpdate
        this.cliente.id=this.usuarioBD.id
        this.cliente.usuario.email=this.usuarioBD.usuario.email
        this.cliente.usuario.nombre=this.usuarioBD.usuario.nombre
        this.cliente.usuario.apellido=this.usuarioBD.usuario.apellido
        this.perfilSer.actualizarCliente(this.cliente)
        localStorage.removeItem("currentCliente");
        this.authServ.setCliente(await this.perfilSer.getIdCliente(this.cliente.id))
      console.log("despues CLIENTE",this.cliente)
    }
    if(this.authServ.getTipo()==="PROFESIONAL"){
      this.profesional=this.usuarioBD
      this.perfilSer.actualizarProfesional(this.profesional)
      console.log("despues PROFESIONAL",this.profesional)
    }
    console.log("actualizando datos")
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
