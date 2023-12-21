import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static readonly USER_STORAGE_KEY = 'users';
  private static readonly CURRENT_USER = 'currentUser';

  private users: User[] = [];
  private userSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>(
    []
  );

  private currentUser!: User | null;
  private currentUserubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  public users$: Observable<User[]> = this.userSubject.asObservable();
  public currentUser$: Observable<User | null> =
    this.currentUserubject.asObservable();

  constructor(
    private storageService: LocalStorageService,
    private router: Router
  ) {}

  public fetchDataFromLocalStorage() {
    this.users =
      this.storageService.getValue<User[]>(UserService.USER_STORAGE_KEY) || [];

    this.currentUser =
      this.storageService.getValue<User | null>(UserService.CURRENT_USER) ||
      null;
    this.updateData();
  }

  public updateToLocalStorage() {
    this.storageService.setValue(UserService.USER_STORAGE_KEY, this.users);
    this.storageService.setValue(UserService.CURRENT_USER, this.currentUser);
    this.updateData();
  }

  public getUserById(id: number): Observable<User | undefined> {
    return of(this.users.find((u) => u.id === id));
  }

  public addUser(user: User): boolean {
    const isHasUser = this.users.find((u) => u.username === user.username);

    if (isHasUser) {
      alert('Username has already exist!');
      return false;
    }

    user.id = new Date(Date.now()).getTime();
    this.users.unshift(user);

    this.updateToLocalStorage();

    return true;
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

  public login(username: string, password: string): void {
    const user = this.users.find((u) => u.username === username);
    if (!user) {
      alert('Username does not exist!');
      return;
    }

    if (user.password !== password) {
      alert('Your username or password is not invalid!');
      return;
    }

    this.currentUser = user;
    this.updateToLocalStorage();

    this.router.navigate(['/home']);
  }

  public logout() {
    this.storageService.removeItem(UserService.CURRENT_USER);
    this.currentUser = null;
    this.updateData();

    this.router.navigate(['/account/login']);
  }

  private updateData() {
    this.userSubject.next(this.users);
    this.currentUserubject.next(this.currentUser);
  }
}
