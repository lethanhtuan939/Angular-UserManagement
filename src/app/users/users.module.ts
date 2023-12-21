import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { loginGuard } from '../guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
    canActivate: [loginGuard],
    children: [
      { path: '', component: UserListComponent },
      { path: 'add-user', component: AddUserComponent },
      { path: ':id', component: EditUserComponent },
    ],
  },
];

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersModule {}
