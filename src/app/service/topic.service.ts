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

  /**
 * @description
 * Create Topic Request to backend.
 * 
 * @param topic form value.
 */
  createTopic(topic: any) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.post(`${environment.base_user}/topic`, topic, { headers: headers });
  }

  /**
* @description
* Get Topic Request to backend.
*/
  getTopic() {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.get(`${environment.base_user}/topic`, { headers: headers });
  }


}
