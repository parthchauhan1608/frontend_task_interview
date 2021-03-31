import { Component, OnInit } from '@angular/core';
import { TopicService } from '../service/topic.service';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  topics: any = [];
  topicForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private topicservice: TopicService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.generateTopicForm()

    this.getTopics();
  }

  generateTopicForm() {
    this.topicForm = this.formBuilder.group({
      title: ['', Validators.required],
      discription: ['', Validators.required]
    });
  }

  getTopics() {
    this.topicservice.getTopic().subscribe(
      (topic: any) => {
        if (topic.code === 200) {
          this.topics = topic.data;
        }
        else {
          this.toastr.error(topic.message);
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
  get f() { return this.topicForm.controls; }

  /**
* @description
* Login on submit of form.
*/
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.topicForm.invalid) {
      return;
    }

    let topicData: any = this.topicForm.value;
    let userDetail: any = window.localStorage.getItem('userDetail');
    topicData.user_id = JSON.parse(userDetail)._id;

    this.topicservice.createTopic(topicData)
      .subscribe(
        (topic: any) => {
          this.loading = false;
          this.submitted = false;
          if (topic.code === 200) {
            this.generateTopicForm()

            this.getTopics();
          } else {
            this.toastr.error(topic.message);
            return;
          }
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.submitted = false;
          this.toastr.error(error.error.message);
          return;
        });
  }
}
