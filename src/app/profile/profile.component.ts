import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public servicioUsuario: UsersService) { }

  ngOnInit(): void {
    this.getUserLogged()
  }

  getUserLogged() {
    this.servicioUsuario.getUser().subscribe(user => {
      console.log(user);
    });
  }
}
