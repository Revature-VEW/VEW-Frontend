import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Answer } from 'src/app/models/answer';
import { Question } from 'src/app/models/question';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionDetailService } from 'src/app/services/question-detail.service';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnInit, OnDestroy {
  @Input() question: Question;
  answers: Answer[];
  getAnswersSubscription: Subscription;
  questionDetailSubscription: Subscription;

  constructor(private answerService: AnswerService, private questionDetailService: QuestionDetailService) { }

  ngOnInit(): void {
    this.getAnswersSubscription = this.answerService.getAnswersByQuestionId(this.question.questionId).subscribe(
      response => {
        this.answers = response;
      }
    );
    this.questionDetailSubscription = this.questionDetailService.newAnswerAdded.subscribe(
      answer => {
        this.answers.push(answer);
      }
    );
  }

  ngOnDestroy(): void {
    this.getAnswersSubscription.unsubscribe();
    this.questionDetailSubscription.unsubscribe();
  }
}
