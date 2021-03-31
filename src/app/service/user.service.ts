import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


  /**
   * @description
   * Registration Request to backend.
   * 
   * @param user form value of registartion field.
   */
  register(user: any) {
    return this.http.post(`${environment.base_user}/user/register`, user);
  }

  /**
 * @description
 * Login Request to backend.
 * 
 * @param user Login form value id and password.
 */
  login(user: any) {
    return this.http.post(`${environment.base_user}/user/login`, user);
  }
}
