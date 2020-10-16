import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUserService } from '../services/auth/auth-user.service';
import { Observable } from 'rxjs';
import { ProfileService } from '../services/perfil/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public user$: Observable<any> = this.authSvc.angularAuth.user;
  @Output() salida=new EventEmitter<string>()
  constructor(public router: Router, private authSvc: AuthUserService,public perfilSer: ProfileService) {}

  ngOnInit() {
    
  }

  async exit() {
    try {
      this.perfilSer.cliente.next(false)
      this.perfilSer.profesional.next(false)
     // this.salida=
     ////(messageEvent)="receiveMessage($event)"
      await this.authSvc.logOut();
      this.router.navigate(['/ingresar']);
    } catch (error) {
      console.log(error);
    }
  }
}
