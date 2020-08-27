import { Component } from '@angular/core';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-wod';

  constructor(private user:UsersService){

  }
  
  barraLat(){
    return this.user.barra_lateral
  }

  medidas(){
      
  }
}
