import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.afAuth.user;
  public login=true
  constructor(public router: Router, private authSvc: AuthUserService) {}

  ngOnInit() {
    
  }

  async exit() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/ingresar']);
    } catch (error) {
      console.log(error);
    }
  }
}
