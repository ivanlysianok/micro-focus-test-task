import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.interface';
import { URL_LIST } from '../constants/url-list.const';

@Injectable()
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  /**
   * Find user from /users API and save him in to localStorage
   * @param userName user name param
   * @returns Observable TRUE if user is found out and added to localStorage,
   * otherwise Observable FALSE
   */
  login(userName: string): Observable<boolean> {
    return this.httpClient.get<User[]>(`${URL_LIST.BASE}/users`).pipe(
      switchMap((users: User[]) => {
        if (!users || !users.length) {
          return of(false);
        }

        const user = users.find((user) => user.username === userName);
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          return of(true);
        }

        return of(false);
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
}
