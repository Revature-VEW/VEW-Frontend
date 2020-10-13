import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnswerService } from './answer.service';
import { environment } from 'src/environments/environment';
import { getTestAnswers } from '../testing/test-answer';

describe('AnswerService', () => {
  let service: AnswerService;
  let httpMock: HttpTestingController;
  const mockAnswers = getTestAnswers();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AnswerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add answer', () => {
    const mockAnswer = mockAnswers[0];

    service.addAnswer('').subscribe(
      returnedAnswer => {
        expect(returnedAnswer.answerId).toEqual(1);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}answer`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockAnswer);
  });

  it('should find all answers by question', () => {
    const mockAnswersForReturn = mockAnswers;

    service.getAnswersByQuestionId(13).subscribe(
      returnedAnswers =>{
        expect(returnedAnswers.length).toEqual(5);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}answer/question/13`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAnswersForReturn);
  });
});
