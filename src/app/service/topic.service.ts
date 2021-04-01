import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(
    private http: HttpClient
  ) { }


  getHeaderWithToken() {
    let token = window.localStorage.getItem('token');
    return new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'auth_token': token
      }
    )
  }

  /**
 * @description
 * Create Topic Request to backend.
 * 
 * @param topic form value.
 */
  createTopic(topic: any) {
    return this.http.post(`${environment.base_user}/topic`, topic, { headers: this.getHeaderWithToken() });
  }

  /**
* @description
* Get Topic Request to backend.
*/
  getTopic() {
    return this.http.get(`${environment.base_user}/topic`, { headers: this.getHeaderWithToken() });
  }


}
