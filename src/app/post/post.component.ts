import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../service/post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: any = [];
  postForm: FormGroup;
  submitted = false;
  loading = false;
  topic_id: any;
  constructor(
    private postservice: PostService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.topic_id = this.activateRoute.snapshot.params['topic_id'];
    if (!this.topic_id) {
      this.router.navigate(['/topic']);
    }
    this.generatePostForm()
    this.getPost();
  }

  generatePostForm() {
    this.postForm = this.formBuilder.group({
      name: ['', Validators.required],
      discription: ['', Validators.required]
    });
  }

  getPost() {
    this.postservice.getPost(this.topic_id).subscribe(
      (post: any) => {
        if (post.code === 200) {
          this.posts = post.data;
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
  get f() { return this.postForm.controls; }

  /**
* @description
* Login on submit of form.
*/
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.postForm.invalid) {
      return;
    }

    let postData: any = this.postForm.value;
    let userDetail: any = window.localStorage.getItem('userDetail');
    postData.user_id = JSON.parse(userDetail)._id;
    postData.topic_id = this.topic_id;

    this.postservice.createPost(postData)
      .subscribe(
        (post: any) => {
          this.loading = false;
          this.submitted = false;
          if (post.code === 200) {
            this.generatePostForm()
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
