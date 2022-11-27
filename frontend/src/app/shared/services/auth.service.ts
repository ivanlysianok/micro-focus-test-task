import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { URL } from '../constants/url.const';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Find user in /users API and save him in to localStorage
   * @param userName user name
   * @returns Observable TRUE if user is found out and added to localStorage,
   * otherwise Observable FALSE
   */
  login(userName: string): Observable<boolean> {
    return this.httpClient.get<User[]>(`${URL.BASE}/users`).pipe(
      map((users: User[]) => {
        if (!users || !users.length) {
          return false;
        }
        const user = users.find((user) => user.username === userName);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  /**
   * Provide deletion of user from localStorage
   * @returns Observable TRUE if user is deleted successfully, otherwise
   * Observable FALSE
   */
  logout(): Observable<boolean> {
    localStorage.removeItem('user');

    const getUserFromLocalStorage = localStorage.getItem('user');
    if (!getUserFromLocalStorage) {
      return of(true);
    }

    return of(false);
  }

  /**
   * Get user from localStorage
   * @returns User or NULL
   */
  getUser(): Observable<User | null> {
    const user = localStorage.getItem('user');
    if (user) {
      return of(JSON.parse(user));
    }
    return of(null);
  }
}
