import { Component, ViewChild } from '@angular/core';
import { AuthUserService } from './services/auth/auth-user.service';
import { Observable,  } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'frontend-wod';
  mensaje:string
  public user$: Observable<any> = this.user.angularAuth.user;
  @ViewChild('sidenav') sidenav: MatSidenav;
  
  constructor(private user: AuthUserService) {
    console.log('cambio del usuario:', this.user$)
  }

  ngOnInit() {
  }

  receiveMessage($event) {
    this.mensaje = $event
    console.log(this.mensaje)
    this.sidenav.close()
  }

}
