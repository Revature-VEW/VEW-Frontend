import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registration = this.formBuilder.group({
    email: [null, Validators.required],
    password: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const newUserForm = JSON.stringify(this.registration);
    this.userService.registerUser(newUserForm).subscribe(
      response => {
        // TODO: if this returns a user with id send to login page
        // otherwise have error that has them resubmit information
        console.log(response);
      }
    );
  }
}
