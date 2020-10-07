import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { QuestionService } from './question.service';
import { environment } from 'src/environments/environment';

describe('QuestionService', () => {
  let service: QuestionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(QuestionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add question', () => {
    const mockQuestion = {
      questionId: 2,
      question: 'What is Java?',
      totalUpvotes: 0,
      totalDownvotes: 0
    };

    service.addQuestion('').subscribe(
      returnedQuestion => {
        expect(returnedQuestion.questionId).toEqual(2);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}question`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockQuestion);
  });

  it('should get question by id', () => {
    const mockQuestion = {
      questionId: 2,
      question: 'What is Java?',
      totalUpvotes: 0,
      totalDownvotes: 0
    };

    service.getQuestionByQuestionId(2).subscribe(
      returnedQuestion => {
        expect(returnedQuestion.questionId).toEqual(2);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}question/2`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockQuestion);
  });
});
