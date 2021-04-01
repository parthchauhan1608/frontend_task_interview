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
* Create Post Request to backend.
* 
* @param post form value.
*/
  createPost(post: any) {
    return this.http.post(`${environment.base_user}/post`, post, { headers: this.getHeaderWithToken() });
  }

  /**
* @description
* Get Post Request to backend.
*/
  getPost(topic_id: any) {
    return this.http.get(`${environment.base_user}/post/${topic_id}`, { headers: this.getHeaderWithToken() });
  }

  /**
* @description
* Create comment on Post Request to backend.
* 
* @param comment form value.
*/
  commentOnPost(post_id: any, comment: any) {
    return this.http.post(`${environment.base_user}/post/comment/${post_id}`, comment, { headers: this.getHeaderWithToken() });
  }


  /**
* @description
* Get Post Request to backend.
*/
  getPostById(post_id: any) {
    return this.http.get(`${environment.base_user}/post/postId/${post_id}`, { headers: this.getHeaderWithToken() });
  }
}
