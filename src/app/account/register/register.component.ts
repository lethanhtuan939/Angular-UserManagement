import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  public onRegister() {
    const value = this.registerForm.value;
    if (value.password !== value.confirmPassword) {
      alert('Your password is not same');
      return;
    }

    const user: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
      password: value.password,
    };

    const isSuccess = this.userService.addUser(user);

    if (isSuccess) {
      this.registerForm.reset();

      this.router.navigate(['/account/login']);
    }
  }
}
