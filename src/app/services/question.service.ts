import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  questionUrl = `${environment.apiUrl}question`;

  constructor(private httpClient: HttpClient ) { }

  addQuestion(questionForm): Observable<Question> {
    const httpHead = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Orgin': '*'
      })
    };
    return this.httpClient.post<Question>(this.questionUrl, questionForm, httpHead);
  }
}
