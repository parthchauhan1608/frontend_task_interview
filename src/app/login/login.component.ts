import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { HttpErrorResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
* @description
* returns perticular Form control to validate.
*/
  get f() { return this.loginForm.controls; }



  /**
  * @description
  * Login on submit of form.
  */
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value)
      .subscribe(
        (user: any) => {
          this.loading = false;
          if (user.code === 200) {
            this.toastr.success('Login success');
            window.localStorage.setItem('token', user.data.token);
            let userDetail: any = JSON.stringify(user.data.userDetail)
            window.localStorage.setItem('userDetail', userDetail);
            this.router.navigate(['topic']);
          } else {
            this.toastr.error(user.message);
            return;
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.toastr.error(error.error.message);
          return;
        });
  }

}
