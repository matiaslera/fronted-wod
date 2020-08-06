import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
   }

   getUsers(): Observable<any>{
    return this.http.get('https://reqres.in/api/users?page=2');
  }
  createUser(user: any): Observable<any>{
    return this.http.post('https://reqres.in/api/users', user);
  }
  editUser(user: any): Observable<any>{
    return this.http.put('https://reqres.in/api/users/2', user);
  }
}
