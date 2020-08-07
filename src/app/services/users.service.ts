import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient,private cookies: CookieService) {
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
  //***LOGIN Y REGISTER */
  login(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/login", user);
  }
  register(user: any): Observable<any> {
    return this.http.post("https://reqres.in/api/register", user);
  }
  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }
}
