import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {

  post: any;
  commentForm: FormGroup;
  submitted = false;
  loading = false;
  post_id: any;

  constructor(
    private postservice: PostService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.post_id = this.activateRoute.snapshot.params['post_id'];
    if (!this.post_id) {
      this.router.navigate(['/topic']);
    }
    this.generateCommentForm()
    this.getPost();
  }


  generateCommentForm() {
    this.commentForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  getPost() {
    this.postservice.getPostById(this.post_id).subscribe(
      (post: any) => {
        if (post.code === 200) {
          this.post = post.data;
        }
        else {
          this.toastr.error(post.message);
          return;
        }
      },
      (error: HttpErrorResponse) => {
        this.toastr.error(error.error.message);
        return;
      }
    );
  }

  /**
* @description
* returns perticular Form control to validate.
*/
  get f() { return this.commentForm.controls; }

  /**
* @description
* Login on submit of form.
*/
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.commentForm.invalid) {
      return;
    }

    let postData: any = this.commentForm.value;
    let userDetail: any = window.localStorage.getItem('userDetail');
    postData.user_id = JSON.parse(userDetail)._id;

    this.postservice.commentOnPost(this.post_id, postData)
      .subscribe(
        (post: any) => {
          this.loading = false;
          this.submitted = false;
          if (post.code === 200) {
            this.generateCommentForm()
            this.getPost();
          } else {
            this.toastr.error(post.message);
            return;
          }
        },
        (error: HttpErrorResponse) => {
          this.submitted = false;
          this.loading = false;
          this.toastr.error(error.error.message);
          return;
        });
  }

}
