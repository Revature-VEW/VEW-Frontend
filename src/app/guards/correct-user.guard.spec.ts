import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { __param } from 'tslib';
import { ActivatedRouteStub } from '../testing/activated-route-stub';

import { CorrectUserGuard } from './correct-user.guard';

describe('CorrectUserGuard', () => {
  let guard: CorrectUserGuard;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRouteSnapshotMock = new ActivatedRouteSnapshot();
  activatedRouteSnapshotMock.params = {userId: 1};
  const routerStateSnapshotMock: any = { snapshot: {}, url: 'users/1'};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: routerSpy}
      ]
    });
    guard = TestBed.inject(CorrectUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to the correct user homepage if the user goes to the wrong one', () => {
    const mockUser = {
      userId: 2,
      email: 'testone@host.com',
      firstName: 'Test',
      lastName: 'One'
    };

    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    expect(guard.canActivate(activatedRouteSnapshotMock, routerStateSnapshotMock)).toEqual(false);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['users/2']);
  });

  it('should allow canActive if the user goes to the right user homepage', () => {
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
