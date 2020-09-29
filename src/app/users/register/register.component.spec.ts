import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  const registerUserServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        {provide: UserService, useValue: registerUserServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;

    // pass in the form dynamically
    component.registration = formBuilder.group({
      email: 'test@host.com',
      password: 'test',
      firstName: 'Test',
      lastName: null
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form invalid should be true when form is invalid', (() => {
    expect(component.registration.invalid).toBeTruthy();
  }));

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
});
