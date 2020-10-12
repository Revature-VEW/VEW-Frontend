import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';

import { UserGuard } from '../guards/user.guard';
import { CorrectUserGuard } from '../guards/correct-user.guard';
import { UserQuestionsComponent } from './user-homepage/user-questions/user-questions.component';
import { UserAnswersComponent } from './user-homepage/user-answers/user-answers.component';
import { ActivityComponent } from './user-homepage/activity/activity.component';
import { TechnologiesComponent } from './user-homepage/technologies/technologies.component';
import { SettingsComponent } from './user-homepage/settings/settings.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: ':userId',
    component: UserHomepageComponent,
    canActivate: [UserGuard, CorrectUserGuard],
    children: [
      {path: 'questions', component: UserQuestionsComponent},
      {path: 'answers', component: UserAnswersComponent},
      {path: 'activity', component: ActivityComponent},
      {path: 'technologies', component: TechnologiesComponent},
      {path: 'settings', component: SettingsComponent}
    ]
  },
  {
    path: '',
    component: UsersComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
