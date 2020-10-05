import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../angular-material.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';


@NgModule({
  declarations: [QuestionsComponent, AddQuestionComponent, QuestionDetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class QuestionsModule { }
