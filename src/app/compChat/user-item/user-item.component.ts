import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/app/domain/user';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

  @Input() user: Usuario;
  constructor() { }

  ngOnInit(): void {
  }

}
