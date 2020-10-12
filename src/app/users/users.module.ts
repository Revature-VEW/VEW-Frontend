import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { UsersRoutingModule } from './users-routing.module';

import { UsersComponent } from './users.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserQuestionsComponent } from './user-homepage/user-questions/user-questions.component';
import { UserAnswersComponent } from './user-homepage/user-answers/user-answers.component';
import { ActivityComponent } from './user-homepage/activity/activity.component';
import { TechnologiesComponent } from './user-homepage/technologies/technologies.component';
import { SettingsComponent } from './user-homepage/settings/settings.component';

@NgModule({
  declarations: [UsersComponent, RegisterComponent, LoginComponent, UserHomepageComponent, UserQuestionsComponent, UserAnswersComponent, ActivityComponent, TechnologiesComponent, SettingsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    AngularMaterialModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UsersModule { }
