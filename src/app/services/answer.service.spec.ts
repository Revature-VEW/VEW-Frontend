import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AnswerService } from './answer.service';
import { environment } from 'src/environments/environment';

describe('AnswerService', () => {
  let service: AnswerService;
  let httpMock: HttpTestingController;

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
    const mockAnswer = {
      answerId: 1,
      answer: 'General purpose programming language',
      totalUpvotes: 0,
      totalDownvotes: 0,
      question: {
        questionId: 2,
        question: 'What is Java?'
      },
      user: {
        userId: 5,
        firstName: 'Test',
        lastName: 'One'
      }
    };

    service.addAnswer('').subscribe(
      returnedAnswer => {
        expect(returnedAnswer.answerId).toEqual(1);
      }
    );

    const req = httpMock.expectOne(`${environment.apiUrl}answer`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockAnswer);
  });
});
