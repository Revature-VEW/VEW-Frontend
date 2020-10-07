import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteStub } from '../../testing/activated-route-stub';
import { Question } from 'src/app/models/question';

import { QuestionDetailComponent } from './question-detail.component';
import { QuestionService } from 'src/app/services/question.service';
import { asyncData } from 'src/app/testing/async-observable-helpers';


describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;
  const expectedQuestion: Question = {
    questionId: 13,
    question: 'Why is Dakota?',
    totalUpvotes: 0,
    totalDownvotes: 0,
    creationDate: new Date(),
    lastModifiedDate: new Date(),
    user: {
      userId: 5,
      firstName: 'John',
      lastName: 'Doe'
    }
  };
  const activatedRoute = new ActivatedRouteStub({ questionId: expectedQuestion.questionId });
  const questionServiceSpy = jasmine.createSpyObj('QuestionService', ['getQuestionByQuestionId']);


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionDetailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: QuestionService, useValue: questionServiceSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailComponent);
    component = fixture.componentInstance;
    questionServiceSpy.getQuestionByQuestionId.and.returnValue(asyncData(expectedQuestion));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an author', () => {
    component.currentQuestionAuthor = {
      firstName: 'John',
      lastName: 'Doe'
    };
    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const authorParagraph = compiledElements.querySelector('#author');
    expect(authorParagraph.textContent).toBe('By: John Doe');
  });
});
