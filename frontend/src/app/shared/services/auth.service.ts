import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUri = 'https://jsonplaceholder.typicode.com';

  constructor(private httpClient: HttpClient) {}

  login(userName: string): Observable<boolean> {
    return this.httpClient.get<User[]>(`${this.baseUri}/users`).pipe(
      switchMap((users: User[]) => {
        if (!users || !users.length) {
          return of(false);
        }

        console.log(users);
        const findUserByUserName = users.find(
          (user) => user.username === userName
        );
        if (findUserByUserName) {
          localStorage.setItem('user', JSON.stringify(findUserByUserName));
          return of(true);
        } else {
          return of(false);
        }
      })
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('user');
    return of(true);
  }
}
