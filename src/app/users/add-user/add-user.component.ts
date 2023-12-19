import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  public addForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    })
  }

  onSubmit() {
    const value = this.addForm.value;
    if (value.password !== value.confirmPassword) {
      alert("Your password is not same");
      return;
    }

    const user: User = {
      firstName: value.firstName,
      lastName: value.lastName,
      username: value.username,
      password: value.password
    }

    this.userService.addUser(user);

    this.addForm.reset();

    alert("Add new user successfully!");
  }
}
