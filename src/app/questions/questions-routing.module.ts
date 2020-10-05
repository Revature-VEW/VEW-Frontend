import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionsComponent } from './questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { QuestionDetailComponent } from './question-detail/question-detail.component';

import { UserGuard } from '../guards/user.guard';

const routes: Routes = [
  {
    path: 'ask',
    component: AddQuestionComponent,
    canActivate: [UserGuard]
  },
  {
    path: ':questionId',
    component: QuestionDetailComponent
  },
  {
    path: '',
    component: QuestionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
