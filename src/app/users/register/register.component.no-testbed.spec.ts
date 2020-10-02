import { FormBuilder } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';
import { asyncData, asyncError } from '../../testing/async-observable-helpers';

import { RegisterComponent } from './register.component';
import { User } from '../../models/user';



describe('RegisterComponent - no TestBed', () => {
    let component: RegisterComponent;
    let expectedUser: User;
    let userServiceSpy: any;
    let router: any;
    const formBuilder: FormBuilder = new FormBuilder();

    // Angular documenaton suggests using beforeEach((done: DoneFn) => {
    // But was getting an Error: Timeout
    //      - Async function did not complete within 5000ms (set by jasmine.DEFAULT_TIMEOUT_INTERVAL)
    // eliminating done: DoneFn solved this problem
    beforeEach(() => {
        expectedUser = {userId: 1};
        router = jasmine.createSpyObj('Router', ['navigate']);
        userServiceSpy = jasmine.createSpyObj('UserService', ['registerUser']);
        userServiceSpy.registerUser.and.returnValue(asyncData(expectedUser));

        component = new RegisterComponent(router, formBuilder, userServiceSpy);
        component.ngOnInit();
    });

    it('should register when submit clicked', () => {
        component.onSubmit();
        expect(userServiceSpy.registerUser.calls.any()).toBe(true, 'RegisterComponent.onSubmit called');
        expect(router.navigate.calls.any()).toBe(false, 'Router.navigate not called yet');
    });

    it('should navigate when onSubmit resolves', (done: DoneFn) => {
        component.onSubmit();
        // waits for async onSubmit to complete before navigating
        userServiceSpy.registerUser.calls.first().returnValue.subscribe(
            () => {
                expect(router.navigate.calls.any()).toBe(true, 'Router.navigate called');
                done();
            }
        );
    });

    it('should not navigate when onSubmit resolves and there is an error', fakeAsync(() => {
        userServiceSpy.registerUser.and.returnValue(asyncError({status: 406}));
        component.onSubmit();
        tick();
        expect(component.errorExists).toBe(true, 'An Error does exist');
        expect(router.navigate.calls.any()).toBe(false, 'Router.navigate not called');
    }));
});
