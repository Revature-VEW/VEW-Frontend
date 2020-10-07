import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { User } from 'src/app/models/user';
import { QuestionService } from '../../services/question.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit, OnDestroy {
  errorExists: boolean;
  errorMessage: string;
  loggedInUser: User;
  addQuestionSubscription: Subscription;
  addQuestion = this.formBuilder.group({
    question: [null, Validators.required],
    user: [null]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private qustionService: QuestionService) { }

  ngOnInit(): void {
    this.errorExists = false;
    this.errorMessage = '';
    this.addQuestionSubscription = new Subscription();
  }

  onSubmit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('userInfo'));
    this.addQuestion.value.user = this.loggedInUser;
    const addQuestionForm = JSON.stringify(this.addQuestion.value);
    this.addQuestionSubscription = this.qustionService.addQuestion(addQuestionForm).subscribe(
      response => {
        this.router.navigate([`questions/${response.questionId}`]);
      }
    );
  }

  ngOnDestroy(): void {
    this.addQuestionSubscription.unsubscribe();
  }
}
