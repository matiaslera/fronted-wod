import { Component } from '@angular/core';
import { AuthUserService } from './services/auth/auth-user.service';
import { Observable, from, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-wod';
  public user$: Observable<any> = this.user.angularAuth.user;
  constructor(private user: AuthUserService) {
    console.log('cambio del usuario:', this.user$)
  }

  ngOnInit() {
  }

}
