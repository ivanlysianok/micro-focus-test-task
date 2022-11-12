import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CollectionResult } from 'src/app/shared/models/collection-result.interface';
import { User } from 'src/app/shared/models/user.interface';
import { UserPost } from '../models/user-post.interface';

@Injectable()
export class PostService {
  private baseUri = 'https://jsonplaceholder.typicode.com';
  private postList: UserPost[] = [];

  constructor(private httpClient: HttpClient) {}

  getPostsList(
    pageSize: number,
    pageIndex: number
  ): Observable<CollectionResult<UserPost>> {
    return this.getAllUsers().pipe(
      switchMap((users: User[]) => {
        if (!users || !users.length) {
          return of({
            totalCount: 0,
            items: [],
          });
        }
        return this.getAllPosts().pipe(
          switchMap((posts: UserPost[]) => {
            if (!posts || !posts.length) {
              return of({
                totalCount: 0,
                items: [],
              });
            }
            this.postList = posts.map((post: UserPost) => {
              return {
                id: post.id,
                userId: post.userId,
                title: post.title,
                body: post.body,
                user: users.find((user: User) => user.id === post.userId),
              };
            });

            return of({
              totalCount: this.postList.length,
              items: this.postList.slice(
                pageIndex * pageSize,
                pageIndex * pageSize + pageSize
              ),
            });
          })
        );
      })
    );
  }

  private getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUri}/users`);
  }

  private getAllPosts(): Observable<UserPost[]> {
    return this.httpClient.get<UserPost[]>(`${this.baseUri}/posts`);
  }

  getPostByPostId(postId: number): Observable<UserPost | null> {
    const foundedPost = this.postList.find(
      (post: UserPost) => post.id === postId
    );
    if (foundedPost) {
      return of(foundedPost);
    }
    return of(null);
  }
}
