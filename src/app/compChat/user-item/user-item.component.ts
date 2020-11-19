import { Component, Input, OnInit } from '@angular/core';
import { UsuarioFireBD } from 'src/app/domain/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: UsuarioFireBD;
  constructor() { }

  ngOnInit(): void {
  }

}
