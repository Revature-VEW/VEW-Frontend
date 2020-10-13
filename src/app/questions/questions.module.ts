import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AngularMaterialModule } from '../angular-material.module';
import { QuestionsRoutingModule } from './questions-routing.module';

import { QuestionsComponent } from './questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { AnswerComponent } from './answer/answer.component';
import { AnswerDialogComponent } from './answer/answer-dialog/answer-dialog.component';
import { AnswerListComponent } from './answer-list/answer-list.component';
import { AnswerDetailComponent } from './answer-list/answer-detail/answer-detail.component';



@NgModule({
  declarations: [
    QuestionsComponent,
    AddQuestionComponent,
    QuestionDetailComponent,
    AnswerComponent,
    AnswerDialogComponent,
    AnswerListComponent,
    AnswerDetailComponent],
  imports: [
    CommonModule,
    QuestionsRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule
  ]
})
export class QuestionsModule { }
