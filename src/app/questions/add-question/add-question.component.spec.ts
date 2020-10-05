import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AddQuestionComponent } from './add-question.component';
import { Question } from 'src/app/models/question';
import { QuestionService } from 'src/app/services/question.service';
import { asyncData } from 'src/app/testing/async-observable-helpers';


describe('AddQuestionComponent', () => {
  let component: AddQuestionComponent;
  let fixture: ComponentFixture<AddQuestionComponent>;
  let expectedQuestion: Question;
  const questionServiceSpy = jasmine.createSpyObj('QuestionService', ['addQuestion']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddQuestionComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: QuestionService, useValue: questionServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid should be true when form is invalid', () => {
    expect(component.addQuestion.invalid).toBeTruthy();
  });

  it('Should disable Ask button if Validators not met', () => {
    const compiledElements = fixture.nativeElement;
    const askButton = compiledElements.querySelector('#addQuestion-button');
    expect(askButton.getAttribute('disabled')).toEqual('');
  });

  it('should enable Ask button if validators are met', () => {
    component.addQuestion = formBuilder.group({
      question: 'Why is Dakota?',
      user: {
        userId: 1,
        firstName: 'Admin',
        lastName: 'Power'
      }
    });

    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const askButton = compiledElements.querySelector('#addQuestion-button');
    expect(askButton.getAttribute('disabled')).toEqual(null);
  });

  it('should call QuestionService addQuestion', () => {
    component.addQuestion = formBuilder.group({
      question: 'Why is Dakota?',
      user: {
        userId: 1,
        firstName: 'Admin',
        lastName: 'Power'
      }
    });

    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const askButton = compiledElements.querySelector('#addQuestion-button');
    askButton.click();
    fixture.detectChanges();

    expect(questionServiceSpy.addQuestion).toHaveBeenCalled();
  });

  it('should redirect to question detail page after success', fakeAsync(() => {
    expectedQuestion = {
      questionId: 13,
      question: 'Why is Dakota?',
      user: {
        userId: 1,
        firstName: 'Admin',
        lastName: 'Power'
      }
    };

    questionServiceSpy.addQuestion.and.returnValue(asyncData(expectedQuestion));
    component.onSubmit();
    tick();
    expect(routerSpy.navigate.calls.any()).toBe(true, 'Router.navigate called');
    const navArgs = routerSpy.navigate.calls.first().args[0][0];
    expect(navArgs).toBe('questions/13', 'Should navigate to question with id 13.');
  }));
});
