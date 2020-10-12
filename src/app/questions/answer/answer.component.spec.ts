import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, TestComponentRenderer, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AnswerService } from 'src/app/services/answer.service';
import { asyncData } from 'src/app/testing/async-observable-helpers';

import { AnswerComponent } from './answer.component';
import { of } from 'rxjs';
import { Question } from 'src/app/models/question';

describe('AnswerComponent - no User', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  const answerServiceSpy = jasmine.createSpyObj('AnswerService', ['addAnswer']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerComponent ],
      imports: [ MatDialogModule, ReactiveFormsModule, BrowserAnimationsModule ],
      providers: [
        {provide: AnswerService, useValue: answerServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userInfo', null);
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect if no user exists in local storage', () => {
    component.openDialog();
    fixture.detectChanges();
    expect(routerSpy.navigate.calls.any()).toBe(true, 'Router.navigate called');
    const navArgs = routerSpy.navigate.calls.first().args[0][0];
    expect(navArgs).toBe('users/login', 'Should navigate to login page.');
    expect(JSON.parse(localStorage.getItem('errorMessage'))).toBe('You need to be logged in to answer a question.');
  });
});

describe('AnswerComponent - User', () => {
  let component: AnswerComponent;
  let fixture: ComponentFixture<AnswerComponent>;
  const answerServiceSpy = jasmine.createSpyObj('AnswerService', ['addAnswer']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const dialogRefSpyObj = jasmine.createSpyObj('MatDialog', ['afterClosed']);

  let dialogSpy: jasmine.Spy;
  dialogRefSpyObj.componentInstance = { body: '' }; // attach componentInstance to the spy object...

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerComponent ],
      imports: [ MatDialogModule, ReactiveFormsModule ],
      providers: [
        {provide: AnswerService, useValue: answerServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MatDialog, userValue: dialogRefSpyObj}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const mockUser = {
      userId: 1,
      email: 'testone@host.com',
      firstName: 'Test',
      lastName: 'One'
    };
    const mockQuestion = {
      questionId: 13,
      question: 'What is Java?'
    };
    const mockAnswer = {
      answerId: 1,
      answer: 'Test Answer',
      user: {
        userId: 1,
        firstName: 'Test',
        lastName: 'One'
      },
      question: {
        questionId: 13
      }
    };

    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    fixture = TestBed.createComponent(AnswerComponent);
    component = fixture.componentInstance;
    component.question = mockQuestion;
    dialogSpy = spyOn(TestBed.inject(MatDialog), 'open').and.returnValue(dialogRefSpyObj);
    dialogRefSpyObj.afterClosed.and.returnValue(asyncData('Test Answer'));
    answerServiceSpy.addAnswer.and.returnValue(asyncData(mockAnswer));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog if user exists in local storage', () => {
    const compiledElements = fixture.nativeElement;
    const answerButton = compiledElements.querySelector('#answer-button');
    answerButton.click();
    fixture.detectChanges();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
