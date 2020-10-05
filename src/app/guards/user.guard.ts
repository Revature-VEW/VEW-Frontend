import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (JSON.parse(localStorage.getItem('userInfo')) == null) {
      localStorage.setItem('errorMessage', JSON.stringify('You do not have access to this resource.'));
      this.router.navigate(['users/login']);
      return false;
    }
    return true;
  }
}
