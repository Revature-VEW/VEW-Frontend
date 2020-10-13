import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerDetailComponent } from './answer-detail.component';
import { getTestAnswers } from '../../../testing/test-answer';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AnswerDetailComponent', () => {
  let component: AnswerDetailComponent;
  let fixture: ComponentFixture<AnswerDetailComponent>;
  const testAnswers = getTestAnswers();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDetailComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDetailComponent);
    component = fixture.componentInstance;
    component.answer = testAnswers[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
