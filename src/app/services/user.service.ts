import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly USER_STORAGE_KEY = 'users';

  private users: User[] = [];
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  public users$: Observable<User[]> = this.userSubject.asObservable();

  constructor(private storageService: LocalStorageService) {}

  public fetchDataFromLocalStorage() {
    this.users =
      this.storageService.getValue<User[]>(UserService.USER_STORAGE_KEY) || [];
    this.updateData();
  }

  public updateToLocalStorage() {
    this.storageService.setValue(UserService.USER_STORAGE_KEY, this.users);
    this.updateData();
  }

  public getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
  }

  public addUser(user: User): void {
    const isHasUser = this.users.find((u) => u.username === user.username);

    if (isHasUser) {
      alert('Username has already exist!');
      return;
    }

    user.id = new Date(Date.now()).getTime();
    this.users.unshift(user);

    this.updateToLocalStorage();
  }

  public deleteUserById(id: number | undefined): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    this.users.splice(userIndex, 1);

    this.updateData();
  }

  public updateUser(user: User) {
    const index = this.users.findIndex((u) => u.id === user.id);
    this.users.splice(index, 1, user);

    this.updateToLocalStorage();
  }

  private updateData() {
    this.userSubject.next(this.users);
  }
}
