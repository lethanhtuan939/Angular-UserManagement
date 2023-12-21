import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User } from './model/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'AngularCRUD';

  public currentUser$!: Observable<User | null>;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchDataFromLocalStorage();
    this.currentUser$ = this.userService.currentUser$;
  }

  public logout() {
    this.userService.logout();
  }
}
