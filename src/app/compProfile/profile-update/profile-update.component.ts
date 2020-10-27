import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Calificacion, Tipo, Usuario } from 'src/app/domain/user';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css'],
})
export class ProfileUpdateComponent implements OnInit {
  @Input() actualizar: number;
  @Output() cancelar = new EventEmitter<boolean>();
  @Output() update = new EventEmitter<any>();
  usuarioBD: Calificacion;
  userUpdate: Usuario = new Usuario();
  cliente: Cliente = new Cliente();
  profesional: Profesional = new Profesional();
  formDomicilio: FormGroup = this.formularioFB.group({
    usuario: ['', Validators.required],
    youEmail: ['', [Validators.required, Validators.email]],
    contrasenia: ['', [Validators.required, Validators.minLength(6)]],
    confirmarContrasenia: ['', [Validators.required, Validators.minLength(4)]],
  });

  formDatos: FormGroup = this.formularioFB.group({
    nacionalidad: ['', Validators.required],
    telefono: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(16)],
    ],
    nacimiento: [''],
    dni: [''],
  });

  constructor(
    public authServ: AuthUserService,
    private formularioFB: FormBuilder,
    public perfilSer: ProfileService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (this.authServ.getTipo() === 'CLIENTE') {
      this.usuarioBD = this.authServ.getCurrentCliente();
      console.log('estoy en LOCAL STORAGE- CLIENTE:', this.usuarioBD);
    }
    if (this.authServ.getTipo() === 'PROFESIONAL') {
      this.usuarioBD = this.authServ.getCurrentProfesional();
      console.log('estoy en LOCAL STORAGE- PROFESIONAL:', this.usuarioBD);
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

  updateDireccion() {
    console.log('actualizando direccion');
  }

  async updateDato() {
    this.formDato()
    if (this.esCliente()) {
      this.updateCliente();
      this.perfilSer.actualizarCliente(this.cliente);
      localStorage.removeItem('currentCliente');;
      this.authServ.setCliente(  await this.perfilSer.getIdCliente(this.cliente.id) );
      this.usuarioBD = this.authServ.getCurrentCliente();
      this.update.emit('listo');
      this.mensaje('se actualizo los datos correctamente');
    }
    if (this.esProfesional()) {
      this.updateProfesional();
      this.perfilSer.actualizarProfesional(this.profesional);
      localStorage.removeItem('currentProfesional');
      this.authServ.setProfesional(await this.perfilSer.getIdProfesional(this.profesional.id) );
      this.usuarioBD = this.authServ.getCurrentProfesional();
      this.update.emit('listo');
      this.mensaje('se actualizo los datos correctamente');
    }
  }

  esCliente(): boolean {
    return this.authServ.getTipo() === 'CLIENTE';
  }

  esProfesional(): boolean {
    return this.authServ.getTipo() === 'PROFESIONAL';
  }

  updateCliente() {
    this.cliente.usuario = this.userUpdate;
    this.cliente.id = this.usuarioBD.id;
    this.cliente.usuario.email = this.usuarioBD.usuario.email;
    this.cliente.usuario.nombre = this.usuarioBD.usuario.nombre;
    this.cliente.usuario.apellido = this.usuarioBD.usuario.apellido;
  }

  updateProfesional() {
    this.profesional.usuario = this.userUpdate;
    this.profesional.id = this.usuarioBD.id;
    this.profesional.usuario.email = this.usuarioBD.usuario.email;
    this.profesional.usuario.nombre = this.usuarioBD.usuario.nombre;
    this.profesional.usuario.apellido = this.usuarioBD.usuario.apellido;
  }

  formDato(){
    this.userUpdate.nacionalidad = this.formDatos.get('nacionalidad').value;
    this.userUpdate.fechaDeNacimiento = this.formDatos.get('nacimiento').value;
    this.userUpdate.telefono = this.formDatos.get('telefono').value;
    this.userUpdate.dni = this.formDatos.get('dni').value;
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 3000,
    });
  }
}
