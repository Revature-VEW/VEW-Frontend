import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  errorExists: boolean;
  errorMessage = '';
  registerUserSubscription: Subscription = new Subscription();
  registration = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.errorExists = false;
  }

  onSubmit(): void {
    const newUserForm = JSON.stringify(this.registration.value);
    this.registerUserSubscription = this.userService.registerUser(newUserForm).subscribe(
      response => {
        this.router.navigate(['/users/login']);
      }, error => {
        this.errorExists = true;
        this.errorMessage = error.error;
      }
    );
  }

  ngOnDestroy(): void {
    this.registerUserSubscription.unsubscribe();
    console.log('RegisterComponent destroyed');
  }
}
