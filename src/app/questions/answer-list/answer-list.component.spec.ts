import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerListComponent } from './answer-list.component';
import { AnswerService } from 'src/app/services/answer.service';
import { QuestionDetailService } from 'src/app/services/question-detail.service';
import { getTestQuestions } from '../../testing/test-question';
import { asyncData } from 'src/app/testing/async-observable-helpers';
import { getTestAnswers } from 'src/app/testing/test-answer';
import { Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AnswerListComponent', () => {
  let component: AnswerListComponent;
  let fixture: ComponentFixture<AnswerListComponent>;
  const testQuestions = getTestQuestions();
  const testAnswers = getTestAnswers();
  const getAnswersSpy = jasmine.createSpyObj('AnswerService', ['getAnswersByQuestionId']);
  const newAnswerAdded = new Subject();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerListComponent ],
      providers: [
        {provide: AnswerService, useValue: getAnswersSpy},
        {provide: QuestionDetailService, useValue: {newAnswerAdded}}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerListComponent);
    component = fixture.componentInstance;
    component.question = testQuestions[0];
    getAnswersSpy.getAnswersByQuestionId.and.returnValue(asyncData(testAnswers));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
