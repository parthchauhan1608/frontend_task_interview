import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private http: HttpClient
  ) { }

  /**
* @description
* Create Post Request to backend.
* 
* @param post form value.
*/
  createPost(post: any) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.post(`${environment.base_user}/post`, post, { headers: headers });
  }

  /**
* @description
* Get Post Request to backend.
*/
  getPost(topic_id: any) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.get(`${environment.base_user}/post/${topic_id}`, { headers: headers });
  }

  /**
* @description
* Create comment on Post Request to backend.
* 
* @param comment form value.
*/
  commentOnPost(post_id: any, comment: any) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.post(`${environment.base_user}/post/comment/${post_id}`, comment, { headers: headers });
  }


  /**
* @description
* Get Post Request to backend.
*/
  getPostById(post_id: any) {
    let headers = new HttpHeaders();
    const token = window.localStorage.getItem('token');
    headers = headers.set('Authorization', token);
    return this.http.get(`${environment.base_user}/post/postId/${post_id}`, { headers: headers });
  }
}
