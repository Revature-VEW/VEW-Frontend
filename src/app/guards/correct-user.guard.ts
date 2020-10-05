import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CorrectUserGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(next.paramMap.get('userId'));
    const userIdNavigatingTo = next.paramMap.get('userId');
    const userIdInLocalStorage = JSON.parse(localStorage.getItem('userInfo')).userId;
    // Do NOT user !== we NEED to have type coercion since they are of different types
    if (userIdNavigatingTo != userIdInLocalStorage) {
      this.route.navigate([`users/${userIdInLocalStorage}`]);
      return false;
    }
    return true;
  }
}
