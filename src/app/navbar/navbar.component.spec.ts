import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RouterLinkDirectiveStub ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
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

describe('NavbarComponent - user logged in', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];
  const mockUser = {
    userId: 1,
    email: 'testone@host.com',
    firstName: 'Test',
    lastName: 'One'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent, RouterLinkDirectiveStub ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances
    // using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('can click profile link', () => {
    const profileLinkDe = linkDes[1];   // profile link DebugElement
    const profileLink = routerLinks[1]; // profile link directive

    expect(profileLink.navigatedTo).toBeNull('Should not have navigated yet');

    profileLinkDe.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(profileLink.navigatedTo).toEqual(['/users/', 1]);
  });
});
