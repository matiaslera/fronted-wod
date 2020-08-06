import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
   }

   getUsers(){
    this.http.get('https://reqres.in/api/users?page=2').subscribe(data => {
      console.log(data);
    });
    console.log("Esto se ejecutará antes que el console log de arriba");
  }
}
