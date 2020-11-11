import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPassComponent implements OnInit {
  email: string;
  error: Observable<any>;
  constructor(private auth: AuthUserService,public router: Router,private snackBar: MatSnackBar,) {}

  ngOnInit(): void {}

  async recuperar() {
      await this.auth.sendPasswordReset(this.email)
      this.router.navigate(['/login']);
      this.mensaje("se envio un email a su correo para recuperar la contraseña, ingrese nuevamente")
  }

  mensaje(errorType: string) {
    this.snackBar.open(errorType, 'x', {
      duration: 4000,
    });
  }

}
