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
  cliente: Cliente = new Cliente()
  profesional: Profesional;
  errors = [];
  formulario: FormGroup = this.formularioFB.group(
    {
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['',[Validators.required, Validators.minLength(4)],
      ],
    },
    { validator: this.matchingPasswords('contrasenia', 'confirmarContrasenia') }
  );
  constructor(private formularioFB: FormBuilder,public router: Router,
    private auth: AuthUserService,private perfilSer: ProfileService) {}

  ngOnInit(): void {}

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
    const { youEmail, contrasenia } = this.formulario.value;
    var usuarioFire=new UserFB()
    usuarioFire.email=youEmail
    this.perfilSer.usurioFB=usuarioFire
    await this.auth.register(youEmail, contrasenia, this.matchWorlds());
  }
  async registerClient() {
    try {
      this.register();
      await this.perfilSer.crearCliente(await this.crearCliente());
      if (this.user$) {
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.log(error);
      mostrarError(this, error);
    }
    console.log('se ingreso como Cliente');
  }

  async crearCliente() {
    var user = this.crearUser(Tipo.CLIENTE)
    this.cliente.usuario = user;
    return this.cliente
  }
  async registerProf() {
    try {
      this.register();
    } catch (error) {
      console.log(error);
      mostrarError(this, error);
    }
    console.log('se ingreso como Profesional');
  }
  crearProfesional() {
    var user = this.crearUser(Tipo.PROFESIONAL)
    this.profesional = new Profesional();
    this.profesional.usuario = user;
  }

  crearUser(tipo:Tipo){
    let user = new Usuario();
    user.email = this.formulario.get('youEmail').value;
    user.nombre = this.formulario.get('nombre').value;
    user.apellido = this.formulario.get('apellido').value;
    user.tipo=tipo
    return user
  }
  matchWorlds() {
    const { nombre, apellido } = this.formulario.value;
    var resultado = nombre + ' ' + apellido;
    return resultado;
  }

  matchingPasswords(password: string, passwordConfirmation: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[password],
        passwordConfirmationInput = group.controls[passwordConfirmation];
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
/**
 * class Celiaco {
  descripcion = 'Celiaco'

  esSubsanada(usuario: Usuario): boolean {
    return true
  }
}

class Diabetico {
  descripcion = 'Diabetico'

  esSubsanada(usuario: Usuario): boolean {
    return usuario.tieneRutina(ACTIVA) || usuario.pesoMenorA(70)
  }
}

class Hipertenso {
  descripcion = 'Hipertenso'

  esSubsanada(usuario: Usuario): boolean {
    return usuario.tieneRutina(INTENSA)
  }
}

class Vegano {
  descripcion = 'Vegano'

  esSubsanada(usuario: Usuario): boolean {
    return usuario.cantidadDeAlimentosPreferidos(GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS, 2)
  }
}

class Vegetariano {
  descripcion = 'Vegetariano'

  esSubsanada(usuario: Usuario): boolean {
    return usuario.esMenorDe(30) || !usuario.cantidadDeAlimentosPreferidos(GrupoAlimenticio.ACEITES_GRASAS_AZUCARES, 1)
  }
}

export const condicionFromJSON = (condicion: string) => {
  if (condicion === 'Celiaco') { return CELIACO }
  if (condicion === 'Diabetico') { return DIABETICO }
  if (condicion === 'Hipertenso') { return HIPERTENSO }
  if (condicion === 'Vegano') { return VEGANO }
  if (condicion === 'Vegetariano') { return VEGETARIANO }
}

export const condicionToJSON = (condicion: Condicion) => {
  return {
    type: condicion.descripcion,
    condicionAlimenticia: condicion.descripcion
  }
}

export enum GrupoAlimenticio {
  HORTALIZAS_FRUTAS_SEMILLAS,
  CEREALES_LEGUMBRES_DERIVADOS,
  LACTEOS_DERIVADOS,
  CARNES_PESCADO_HUEVO,
  ACEITES_GRASAS_AZUCARES
}

export const grupoAlimenticioFromString = (grupo: string) => {
  if (grupo === 'HORTALIZAS_FRUTAS_SEMILLAS') {
    return GrupoAlimenticio.HORTALIZAS_FRUTAS_SEMILLAS
  }
  if (grupo === 'CEREALES_LEGUMBRES_DERIVADOS') {
    return GrupoAlimenticio.CEREALES_LEGUMBRES_DERIVADOS
  }
  if (grupo === 'LACTEOS_DERIVADOS') {
    return GrupoAlimenticio.LACTEOS_DERIVADOS
  }
  if (grupo === 'CARNES_PESCADO_HUEVO') {
    return GrupoAlimenticio.CARNES_PESCADO_HUEVO
  }
  if (grupo === 'ACEITES_GRASAS_AZUCARES') {
    return GrupoAlimenticio.ACEITES_GRASAS_AZUCARES
  }
}

export type Condicion = Celiaco | Diabetico | Hipertenso | Vegano | Vegetariano

export const CELIACO = new Celiaco()
export const DIABETICO = new Diabetico()
export const HIPERTENSO = new Hipertenso()
export const VEGANO = new Vegano()
export const VEGETARIANO = new Vegetariano()

export const Condiciones = [CELIACO, DIABETICO, HIPERTENSO, VEGANO, VEGETARIANO]
 */