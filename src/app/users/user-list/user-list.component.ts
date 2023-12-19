import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.users$.subscribe(users => this.users = users);
  }

  public deleteUserById(id: number | undefined): void {
    const isConfirm = confirm("Dp you want to delete user " + id);
    if (isConfirm) {
      this.userService.deleteUserById(id);
      alert(`Delete user ${id} successfully!`);
    }
  }
}
