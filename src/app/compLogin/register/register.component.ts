import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';
import { Cliente } from 'src/app/domain/cliente';
import { Profesional } from 'src/app/domain/profesional';
import { Usuario, Tipo, UserFB } from 'src/app/domain/user';

function mostrarError(component, error) {
  const errorMessage =
    error.status === 0
      ? 'No hay conexión con el backend, revise si el servidor remoto está levantado.'
      : error.error;
  component.errors.push(errorMessage);
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user$: Observable<any> = this.auth.angularAuth.user;
  cliente: Cliente = new Cliente();
  profesional: Profesional = new Profesional();
  errors = [];
  formulario: FormGroup = this.formularioFB.group(
    {
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    },
    { validator: this.matchingPasswords('contrasenia', 'confirmarContrasenia') }
  );
  constructor(
    private formularioFB: FormBuilder,
    public router: Router,
    private auth: AuthUserService,
    private perfilSer: ProfileService
  ) {}

  ngOnInit(): void {
    console.log(this.user$);
    console.log(this.auth.authUser());
  }

  get nombre() {
    return this.formulario.get('nombre');
  }
  get apellido() {
    return this.formulario.get('apellido');
  }
  get youEmail() {
    return this.formulario.get('youEmail');
  }
  get confirmarContrasenia() {
    return this.formulario.get('confirmarContrasenia');
  }
  get contrasenia() {
    return this.formulario.get('contrasenia');
  }
  async register() {
    this.auth.angularAuth.onAuthStateChanged((userFireBase) => {
      if (userFireBase) {
        return;
      } else {
        const { youEmail, contrasenia } = this.formulario.value;
        var usuarioFire = new UserFB();
        usuarioFire.email = youEmail;
        this.perfilSer.usurioFB = usuarioFire;
        this.auth.register(youEmail, contrasenia, this.matchWorlds());
      }
    });
  }
  /*Situacion 1, sin registro de google */
  async registerClient() {
    try {
      await this.perfilSer.crearCliente(await this.crearCliente());
      this.register();
      if (this.user$) {
        this.router.navigate(['/bienvenido']);
      }
    } catch (error) {
      console.log(error);
      mostrarError(this, error);
    }
    console.log('se ingreso como Cliente');
  }

  async crearCliente() {
    var user = this.crearUser(Tipo.CLIENTE);
    this.cliente.usuario = await user;
    return this.cliente;
  }
  async registerProf() {
    try {
      await this.perfilSer.crearProfesional(await this.crearProfesional());
      this.register();
      if (this.user$) {
        this.router.navigate(['/bienvenido']);
      }
    } catch (error) {
      console.log(error);
      mostrarError(this, error);
    }
    console.log('se ingreso como Profesional');
  }
  async crearProfesional() {
    var user = this.crearUser(Tipo.PROFESIONAL);
    this.profesional.usuario = await user;
    return this.profesional;
  }

  async crearUser(tipo: Tipo) {
    let user = new Usuario();
    await this.auth.angularAuth.onAuthStateChanged((userFireBase) => {
      if (userFireBase) {
        user.nombre = this.formulario.get('nombre').value;
        user.apellido = this.formulario.get('apellido').value;
        user.tipo = tipo;
        user.email = userFireBase.email;
      } else {
        user.email = this.formulario.get('youEmail').value;
        user.nombre = this.formulario.get('nombre').value;
        user.apellido = this.formulario.get('apellido').value;
        user.tipo = tipo;
      }
    });
    return user;
  }

  online():boolean{
    return this.auth.getOnline()==="online"
  }

  off():boolean{
    return this.auth.getOnline()==="off"
  }
  matchWorlds() {
    const { nombre, apellido } = this.formulario.value;
    var resultado = nombre + ' ' + apellido;
    return resultado;
  }

  matchingPasswords(password: string, passwordConfirmation: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],passwordConfirmationInput = group.controls[passwordConfirmation];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }

  onSubmit() {
    var act = document.activeElement.id;
    console.log(document.activeElement.id);
    if (act == 'btn1') {
      this.registerClient();
    }
    if (act == 'btn2') {
      this.registerProf();
    }
  }
}
