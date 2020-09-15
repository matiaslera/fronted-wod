import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { FormControl } from '@angular/forms';
import { AuthUserService } from './services/auth/auth-user.service';
import { Observable, from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-wod';
  public user$: Observable<any> = this.user.afAuth.user;
  constructor(private user: AuthUserService) {
    console.log(this.user$)
  }

  ngOnInit() {
  }
  /* async barraLat() {
    return await this.user.userCurrent();
  } */
}
