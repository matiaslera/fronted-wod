import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { not } from '@angular/compiler/src/output/output_ast';
import { Observable, throwError } from 'rxjs';
import { error } from 'protractor';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPassComponent implements OnInit {
  email: string;
  nota: boolean;
  error: Observable<any>;
  constructor(private auth: AuthUserService) {
    this.nota = false;
  }

  ngOnInit(): void {}

  async recuperar() {
      await this.auth.sendPasswordReset(this.email).
      then( (valor) => this.nota=false,(valor)=>{this.nota=true, this.error=valor})
  }

}
