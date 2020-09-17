import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUserService } from '../services/auth/auth-user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent implements OnInit {

  @Output() cancelar = new EventEmitter<boolean>();
  formulario: FormGroup = this.formularioFB.group(
    {
      usuario: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: ['',[Validators.required, Validators.minLength(4)],],
    },
  );
  constructor(private formularioFB: FormBuilder, private authSvc: AuthUserService) { }

  ngOnInit(): void {
  }

  get usuario() {
    return this.formulario.get('usuario');
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
  
  accept(){
    console.log("aceptado")
  }

  cancel(){
    
  }


 /*  formulario: FormGroup = this.formularioFB.group(
    {
      usuario: ['', Validators.required],
      youEmail: ['', [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(6)]],
      confirmarContrasenia: [
        '',
        [Validators.required, Validators.minLength(4)],
      ],
    },
    { validator: this.matchingPasswords('contrasenia', 'confirmarContrasenia') }
  );
  constructor( private formularioFB: FormBuilder,public router: Router,  private authSvc: AuthUserService) {}

  ngOnInit(): void {}

  get usuario() {
    return this.formulario.get('usuario');
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

  async registerClient() {
    const { youEmail, contrasenia } = this.formulario.value;
    try {
      const user = this.authSvc.register(youEmail, contrasenia);
      if (user) {
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.log(error);
    }

    console.log('se ingreso como Cliente');
  }

  async registerProf() {
    const { youEmail, contrasenia } = this.formulario.value;
    try {
      const user = this.authSvc.register(youEmail, contrasenia);
      if (user) {
        this.router.navigate(['/perfil']);
      }
    } catch (error) {
      console.log(error);
    }
    console.log('se ingreso como Profesional');
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
      alert('you have clicked on submit 1');
      this.registerClient();
    }
    if (act == 'btn2') {
      this.registerProf();
      alert('you have clicked on submit 2');
    }
  } */

}
