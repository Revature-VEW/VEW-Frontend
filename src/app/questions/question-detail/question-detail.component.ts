import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  currentQuestion: Question;
  getQuestionSubscription: Subscription;

  constructor(private route: ActivatedRoute, private questionService: QuestionService) { }

  ngOnInit(): void {
    this.currentQuestion = new Question();
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.currentQuestion.questionId = +params.get('questionId');
    });
    this.getQuestionSubscription = this.questionService.getQuestionByQuestionId(this.currentQuestion.questionId).subscribe(
      response => {
        console.log(response);
        this.currentQuestion = response;
        console.log(this.currentQuestion);
      }
    );
    console.log(this.currentQuestion);
  }

}
