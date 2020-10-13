import { TestBed } from '@angular/core/testing';

import { QuestionDetailService } from './question-detail.service';

describe('QuestionDetailService', () => {
  let service: QuestionDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
