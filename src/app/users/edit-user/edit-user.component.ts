import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  public editForm!: FormGroup;
  private user!: User | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = parseInt(this.activedRoute.snapshot.params?.['id']);
    this.userService.getUserById(id).subscribe((user) => (this.user = user));

    this.editForm = this.formBuilder.group({
      firstName: [this.user?.firstName, Validators.required],
      lastName: [this.user?.lastName, Validators.required],
      username: [
        this.user?.username,
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      password: ['', Validators.compose([Validators.minLength(3)])],
      confirmPassword: ['', Validators.compose([Validators.minLength(3)])],
    });
  }

  public onSubmit() {
    const isConfrim = confirm('Do you want to update this user!');
    if (isConfrim) {
      const value = this.editForm.value;

      if (value.password === value.confirmPassword) {
        const newUser: User = {
          id: this.user?.id,
          firstName: value.firstName,
          lastName: value.lastName,
          username: value.username,
          password:
            value.password === '' ? this.user?.password : value.password,
        };

        this.userService.updateUser(newUser);

        alert('Update user successfully!');
      } else {
        alert('Your password is not same!');
      }
    }
  }
}
