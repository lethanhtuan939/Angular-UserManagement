import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users = [
    {
      id: 1,
      firstName: 'Tuan',
      lastName: 'Le',
      username: 'thanhtuanle939',
      password: '123456'
    },
    {
      id: 2,
      firstName: 'Tuan',
      lastName: 'Le',
      username: 'thanhtuanle939',
      password: '123456'
    },
    {
      id: 3,
      firstName: 'Tuan',
      lastName: 'Le',
      username: 'thanhtuanle939',
      password: '123456'
    }
  ]
}
