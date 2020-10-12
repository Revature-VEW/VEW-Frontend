import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/models/question';

import { AnswerDialogComponent } from './answer-dialog/answer-dialog.component';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AnswerService } from '../../services/answer.service';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface DialogData {
  answer: string;
  question: string;
}

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit, OnDestroy {
  answer: string;
  currentUser: User;
  @Input() question: Question;
  addAnswerSubscription: Subscription;
  addAnswer = this.formBuilder.group({
    answer: [null],
    question: [null],
    user: [null]
  });

  constructor(public dialog: MatDialog, private router: Router, private answerService: AnswerService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
    this.addAnswerSubscription = new Subscription();
  }

  openDialog(): void {
    if (this.currentUser != null) {
    const dialogRef = this.dialog.open(AnswerDialogComponent, {
      width: '375px',
      data: {question: this.question.question, answer: this.answer}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addAnswer.value.answer = result;
        this.addAnswer.value.question = this.question.questionId;
        this.addAnswer.value.user = this.currentUser;
        const addAnswerForm = JSON.stringify(this.addAnswer.value);
        this.answerService.addAnswer(addAnswerForm).subscribe(
          response => {
          }
        );
      }
    });
    } else {
      localStorage.setItem('errorMessage', JSON.stringify('You need to be logged in to answer a question.'));
      this.router.navigate(['users/login']);
    }
  }

  ngOnDestroy(): void {
    this.addAnswerSubscription.unsubscribe();
  }
}
