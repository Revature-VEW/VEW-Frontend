import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { UserGuard } from './user.guard';

describe('UserGuard', () => {
  let guard: UserGuard;
  const activatedRouteSnapshotMock: any = { snapshot: {}, url: '/questions/ask'};
  const routerStateSnapshotMock: any = { snapshot: {}};
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    });
    guard = TestBed.inject(UserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to the login route if no user is signed in', () => {
    localStorage.setItem('userInfo', null);
    expect(guard.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock)).toEqual(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users/login']);
  });

  it('should allow navigation if user exists', () => {
    const mockUser = {
      userId: 1,
      email: 'testone@host.com',
      firstName: 'Test',
      lastName: 'One'
    };

    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    expect(guard.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock)).toEqual(true);
  });
});
