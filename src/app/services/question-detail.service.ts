import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class QuestionDetailService {

  constructor() { }

  // Observable string sources
  private newAnswerAddedSource = new Subject<Answer>();

  // Observable string streams
  newAnswerAdded = this.newAnswerAddedSource.asObservable();

  // Service message commands
  addNewAnswerToQuestionDetails(answer: Answer): void {
    this.newAnswerAddedSource.next(answer);
  }
}
