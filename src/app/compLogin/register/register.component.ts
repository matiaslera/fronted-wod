import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public user$: Observable<any> = this.auth.angularAuth.user;
  formulario: FormGroup = this.formularioFB.group(
    {
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['', [Validators.required, Validators.minLength(4)],],
    },
    { validator: this.matchingPasswords('contrasenia', 'confirmarContrasenia') }
  );
  constructor(
    private formularioFB: FormBuilder,
    public router: Router,
    private auth: AuthUserService
  ) {}

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
  register(){
    const { youEmail, contrasenia } = this.formulario.value;
    this.auth.register(youEmail, contrasenia,this.matchWorlds());
    if (this.user$) {
      this.router.navigate(['/perfil']);
    }
  }
  async registerClient() {
    try {
      this.register()
      this.auth.cliente = true;
    } catch (error) {
      console.log(error); }
    console.log('se ingreso como Cliente');
  }

  async registerProf() {
    try {
      this.register()
      this.auth.tecnico = true;
    } catch (error) {
      console.log(error);}
    console.log('se ingreso como Profesional');
  }

   matchWorlds(){
    const { nombre, apellido } = this.formulario.value;
    var resultado = nombre + " " + apellido
    return resultado
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
