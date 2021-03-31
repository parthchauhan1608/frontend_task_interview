import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component'
import { TopicComponent } from './topic/topic.component';
import { PostComponent } from './post/post.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  // 
  { path: '', component: LoginComponent, },
  { path: 'register', component: RegistrationComponent },
  { path: 'topic', component: TopicComponent, canActivate: [AuthGuard] },
  { path: 'post/:topic_id', component: PostComponent, canActivate: [AuthGuard] },
  { path: 'post/comments/:post_id', component: PostCommentsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
