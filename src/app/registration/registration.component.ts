import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }

  /**
 * @description
 * returns perticular Form control to validate.
 */
  get f() { return this.registrationForm.controls; }

  /**
 * @description
 * Form onSubmit called.
 * Register user details form is there.
 */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    let obj = this.registrationForm.value;

    this.userService.register(obj)
      .subscribe(
        (data: any) => {
          this.loading = false;
          if (data.code === 200) {
            this.toastr.success('User Register successfully');
            this.router.navigate(['']);
          }
          else {
            this.toastr.error(data.message);
            return;
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message)
          this.toastr.error(error.error.message);
          return;
        });

  }
}
