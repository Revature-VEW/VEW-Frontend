import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { asyncData, asyncError } from 'src/app/testing/async-observable-helpers';

import { RegisterComponent } from './register.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const expectedUser: User = {
    userId: 5
  };
  const registerUserServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
  const formBuilder: FormBuilder = new FormBuilder();
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: UserService, useValue: registerUserServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    registerUserServiceSpy.registerUser.and.returnValue(asyncData(expectedUser));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid should be true when form is invalid', () => {
    expect(component.registration.invalid).toBeTruthy();
  });

  it('should disable Register button if validators not met', () => {
    const compiledElements = fixture.nativeElement;
    const registrationButton = compiledElements.querySelector('#registration-button');
    expect(registrationButton.getAttribute('disabled')).toEqual('');
  });

  it('should enable Register button if validators are met', () => {
    component.registration = formBuilder.group({
      email: 'test@host.com',
      password: 'test',
      firstName: 'Test',
      lastName: 'one'
    });

    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const registrationButton = compiledElements.querySelector('#registration-button');
    expect(registrationButton.getAttribute('disabled')).toEqual(null);
  });

  it('userService register() should be called', () => {
    component.registration = formBuilder.group({
      email: 'test@host.com',
      password: 'test',
      firstName: 'Test',
      lastName: 'one'
    });
    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const registrationButton = compiledElements.querySelector('#registration-button');
    registrationButton.click();
    fixture.detectChanges();

    expect(registerUserServiceSpy.registerUser).toHaveBeenCalled();
  });

  it('should catch error response from service', fakeAsync(() => {
    const testError = {
      status: 406,
      error: 'Test 406 Error'
    };
    registerUserServiceSpy.registerUser.and.returnValue(asyncError(testError));
    component.onSubmit();
    expect(registerUserServiceSpy.registerUser).toHaveBeenCalled();
    tick();
    expect(component.errorExists).toBe(true);
    expect(component.errorMessage).toBe('Test 406 Error');
  }));
});
