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
  private isDataFromApiLoaded = false;

  constructor(private httpClient: HttpClient) {}

  loadPostsFromApi(): Observable<CollectionResult<UserPost>> {
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

            this.isDataFromApiLoaded = true;
            return of({
              totalCount: this.postList.length,
              items: this.postList,
            });
          })
        );
      })
    );
  }

  getPostList(
    pageSize: number,
    pageIndex: number
  ): Observable<CollectionResult<UserPost>> {
    if (!this.isDataFromApiLoaded) {
      return this.loadPostsFromApi().pipe(
        switchMap(() => {
          return this.getModifiedPostList(pageSize, pageIndex);
        })
      );
    }
    return this.getModifiedPostList(pageSize, pageIndex);
  }

  private getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUri}/users`);
  }

  private getAllPosts(): Observable<UserPost[]> {
    return this.httpClient.get<UserPost[]>(`${this.baseUri}/posts`);
  }

  private getModifiedPostList(
    pageSize: number,
    pageIndex: number
  ): Observable<CollectionResult<UserPost>> {
    if (!this.postList || !this.postList.length) {
      return of({ totalCount: 0, items: [] });
    }
    return of({
      totalCount: this.postList.length,
      items: this.postList.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
      ),
    });
  }

  getPost(postId: number): Observable<UserPost | null> {
    const findPost = this.postList.find((post: UserPost) => post.id === postId);
    if (findPost) {
      return of(findPost);
    }
    return of(null);
  }

  deletePost(postId: number): Observable<boolean> {
    if (!this.postList || !this.postList.length) {
      return of(false);
    }
    const postIndex = this.postList.findIndex(
      (post: UserPost) => post.id === postId
    );
    if (postIndex !== -1) {
      this.postList.splice(postIndex, 1);
      return of(true);
    }
    return of(false);
  }

  updatePost(updatedPost: UserPost): Observable<boolean> {
    if (!this.postList || !this.postList.length) {
      return of(false);
    }
    const postIndex = this.postList.findIndex(
      (p: UserPost) => p.id === updatedPost.id
    );
    if (postIndex !== -1) {
      this.postList = this.postList.map((post: UserPost) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      return of(true);
    }
    return of(false);
  }

  createPost(createdPost: UserPost): Observable<boolean> {
    if (!this.postList) {
      return of(false);
    }
    console.log(this.postList, 'before adding');
    this.postList.unshift(createdPost);
    console.log(this.postList, 'after adding');
    const postIndex = this.postList.findIndex(
      (post: UserPost) => post.id === createdPost.id
    );
    if (postIndex !== -1) {
      return of(true);
    }

    return of(false);
  }
}
