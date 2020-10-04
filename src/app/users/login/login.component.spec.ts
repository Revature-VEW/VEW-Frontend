import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { asyncData, asyncError } from 'src/app/testing/async-observable-helpers';

import { LoginComponent } from './login.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let expectedUser: User;
  const userServiceSpy = jasmine.createSpyObj('UserService', ['loginUser']);
  const formBuilder: FormBuilder = new FormBuilder();
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: UserService, useValue: userServiceSpy},
        {provide: Router, useValue: routerSpy}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid should be true when form is invalid', () => {
    expect(component.login.invalid).toBeTruthy();
  });

  it('Should disable Login button if Validators not met', () => {
    const compiledElements = fixture.nativeElement;
    const loginButton = compiledElements.querySelector('#login-button');
    expect(loginButton.getAttribute('disabled')).toEqual('');
  });

  it('should enable Login button if Validators are met', () => {
    component.login = formBuilder.group({
      email: 'test@host.com',
      password: 'password'
    });

    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const loginButton = compiledElements.querySelector('#login-button');
    expect(loginButton.getAttribute('disabled')).toEqual(null);
  });

  it('userService loginUser should be called', () => {
    component.login = formBuilder.group({
      email: 'test@host.com',
      password: 'password'
    });

    fixture.detectChanges();
    const compiledElements = fixture.nativeElement;
    const loginButton = compiledElements.querySelector('#login-button');
    loginButton.click();
    fixture.detectChanges();

    expect(userServiceSpy.loginUser).toHaveBeenCalled();
  });

  it('should redirect to user homepage after success', fakeAsync(() => {
    expectedUser = {
      userId: 1,
      email: 'test@host.com',
      firstName: 'Test',
      lastName: 'One'
    };

    userServiceSpy.loginUser.and.returnValue(asyncData(expectedUser));
    component.onSubmit();
    tick();
    expect(routerSpy.navigate.calls.any()).toBe(true, 'Router.navigate called');
    const navArgs = routerSpy.navigate.calls.first().args[0][0];
    expect(navArgs).toBe('users/1', 'Should navigate to user with id 1');
  }));

  it('should not navigate when onSubmit resolves and there is an error', fakeAsync(() => {
    const testError = {
      status: 406,
      error: 'A User with that Email does not exist.'
    };
    userServiceSpy.loginUser.and.returnValue(asyncError(testError));
    component.onSubmit();
    tick();
    expect(component.errorExists).toBe(true);
    expect(component.errorMessage).toBe('A User with that Email does not exist.');
  }));
});
