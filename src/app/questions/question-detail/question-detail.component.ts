import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

import { Question } from 'src/app/models/question';
import { User } from 'src/app/models/user';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit, OnDestroy {
  currentQuestion: Question;
  currentQuestionAuthor: User;
  getQuestionSubscription: Subscription;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.currentQuestion = new Question();
    this.currentQuestionAuthor = new User();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentQuestion.questionId = +params.get('questionId');
    });
    this.getQuestionSubscription = this.questionService.getQuestionByQuestionId(this.currentQuestion.questionId).subscribe(
      response => {
        this.currentQuestion = response;
        this.currentQuestionAuthor = response.user;
      }
    );
  }

  ngOnDestroy(): void {
    this.getQuestionSubscription.unsubscribe();
  }
}
