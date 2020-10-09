import { Component, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.css'],
})
export class ResetPassComponent implements OnInit {
  email: string;
  error: Observable<any>;
  constructor(private auth: AuthUserService,public router: Router) {}

  ngOnInit(): void {}

  async recuperar() {
      await this.auth.sendPasswordReset(this.email)
      this.router.navigate(['/login']);
  }

}
