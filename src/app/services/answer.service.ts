import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Answer } from '../models/answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  answerUrl = `${environment.apiUrl}answer`;
  httpHead = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Orgin': '*'
    })
  };

  constructor(private httpClient: HttpClient) { }

  addAnswer(answerForm): Observable<Answer> {
    return this.httpClient.post<Answer>(this.answerUrl, answerForm, this.httpHead);
  }
}
