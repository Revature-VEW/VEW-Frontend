import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorExists: boolean;
  errorMessage = '';
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
    this.userService.registerUser(newUserForm).subscribe(
      response => {
        // TODO: if this returns a user with id send to login page
        // otherwise have error that has them resubmit information
        this.router.navigate(['/users/login']);
      }, error => {
        if (error instanceof HttpErrorResponse) {
          this.errorExists = true;
          this.errorMessage = error.error;
        }
      }
    );
  }
}
