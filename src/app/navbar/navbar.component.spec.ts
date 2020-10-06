import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    localStorage.setItem('userInfo', null);
    fixture.detectChanges();
    expect(component.isLoggedIn()).toBe(false);
  });

  it('should return true if user isLoggedIn()', () => {
    const mockUser = {
      userId: 1,
      email: 'testone@host.com',
      firstName: 'Test',
      lastName: 'One'
    };

    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    fixture.detectChanges();
    expect(component.isLoggedIn()).toBe(true);
  });

  it('should logout() user', () => {
    const mockUser = {
      userId: 1,
      email: 'testone@host.com',
      firstName: 'Test',
      lastName: 'One'
    };

    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    component.logout();
    expect(JSON.parse(localStorage.getItem('userInfo'))).toEqual(null);
  });
});
