import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  fecha= Date.now();
  condicion: boolean;
  constructor() { 
    this.condicion= 2>1;
  }

  ngOnInit(): void {
    this.userIsLogged()
  }

  userIsLogged():boolean{
    return false
  }

  prueba(){
  return this.condicion
  }

}
