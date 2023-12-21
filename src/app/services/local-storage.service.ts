import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage!: Storage;

  constructor() {
    this.storage = window.localStorage;
  }

  public getValue<T>(key: string): T {
    const obj = JSON.parse(this.storage[key] || null);

    return obj || null;
  }

  public setValue(key: string, value: any): void {
    if (!value) {
      return;
    }
    this.storage[key] = JSON.stringify(value);
  }

  public removeItem(key: string) {
    this.storage.removeItem(key);
  }
}
