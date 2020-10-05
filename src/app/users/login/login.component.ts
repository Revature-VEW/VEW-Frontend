import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  errorExists: boolean;
  errorMessage: string;
  loginUserSubscription: Subscription = new Subscription();
  login = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.errorExists = false;
    if (JSON.parse(localStorage.getItem('errorMessage')) != null) {
      this.errorExists = true;
      this.errorMessage = JSON.parse(localStorage.getItem('errorMessage'));
    }
  }

  onSubmit(): void {
    const userForm = JSON.stringify(this.login.value);
    this.loginUserSubscription = this.userService.loginUser(userForm).subscribe(
      response => {
        localStorage.setItem('userInfo', JSON.stringify(response));
        this.router.navigate([`users/${response.userId}`]);
      }, error => {
        this.errorExists = true;
        this.errorMessage = error.error;
      }
    );
  }


  ngOnDestroy(): void {
    this.loginUserSubscription.unsubscribe();
    localStorage.setItem('errorMessage', null);
    console.log('LoginComponent destroyed');
  }
}
