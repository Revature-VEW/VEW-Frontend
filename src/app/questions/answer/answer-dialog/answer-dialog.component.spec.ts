import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../answer.component';

import { AnswerDialogComponent } from './answer-dialog.component';

describe('AnswerDialogComponent', () => {
  let component: AnswerDialogComponent;
  let fixture: ComponentFixture<AnswerDialogComponent>;
  const dialogMock = {
    close: () => { }
    };
  const data: DialogData = {
    answer: '',
    question: 'What is Java?'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnswerDialogComponent ],
      imports: [ MatDialogModule, FormsModule ],
      providers: [
        {provide: MatDialogRef, useValue: dialogMock},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when close button clicked', () => {
    const closeSpy = spyOn(component.dialogRef, 'close').and.callThrough();
    component.onNoClick();
    expect(closeSpy).toHaveBeenCalled();
  });
});
