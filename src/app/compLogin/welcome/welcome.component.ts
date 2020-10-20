import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/services/auth/auth-user.service';
import { ProfileService } from 'src/app/services/perfil/profile.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  usuarioFire:User
  public user$: Observable<any> = this.authSvc.angularAuth.user;
  constructor(public router: Router, private authSvc: AuthUserService,public perfilSer: ProfileService) { }

  ngOnInit(): void {
  }

  async salir(){
    try {
      this.perfilSer.cliente.next(false)
      this.perfilSer.profesional.next(false)
      await this.authSvc.logOut();
      this.router.navigate(['/ingresar']);
    } catch (error) {
      console.log(error);
    }
  }

}
