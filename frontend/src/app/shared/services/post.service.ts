import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CollectionResult } from '../models/collection-result.interface';
import { User } from '../models/user.interface';
import { URL } from '../constants/url.const';
import { UserPost } from '../models/user-post.interface';

@Injectable()
export class PostService {
  /**
   * List of user posts that are loaded from API and then updated locally
   */
  private userPostList: UserPost[] = [];
  /**
   * Flag for distinguishing between local load / server load
   */
  private isDataFromApiLoaded = false;

  constructor(private httpClient: HttpClient) {}

  /**
   * Load data from /users and /posts API, modify them and save in the
   * @see{@link userPostList}
   * @returns Observable with Collection result model with returns @see{@link UserPost} list
   */
  public loadUserPostDataFromApi(): Observable<CollectionResult<UserPost>> {
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
            this.userPostList = posts.map((post: UserPost) => {
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
              totalCount: this.userPostList.length,
              items: this.userPostList,
            });
          })
        );
      })
    );
  }

  /**
   * Get user post data on first load from API and then from
   * local list @see{@link userPostList}
   * @param pageSize Current page size
   * @param pageIndex Current page index
   * @returns Observable with Collection result model which returns @see{@link UserPost} list
   */
  public getUserPostList(
    pageSize: number,
    pageIndex: number
  ): Observable<CollectionResult<UserPost>> {
    if (!this.isDataFromApiLoaded) {
      return this.loadUserPostDataFromApi().pipe(
        switchMap(() => {
          return this.getModifiedPostList(pageSize, pageIndex);
        })
      );
    }
    return this.getModifiedPostList(pageSize, pageIndex);
  }

  /**
   * Get users data from /users API
   * @returns Observable with list of users
   */
  private getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${URL.BASE}/users`);
  }

  /**
   * Get posts data from /posts API
   * @returns Observable with list of posts
   */
  private getAllPosts(): Observable<UserPost[]> {
    return this.httpClient.get<UserPost[]>(`${URL.BASE}/posts`);
  }

  /**
   * Get user post list and modified them according to
   * pagination params
   * @param pageSize Current page size
   * @param pageIndex Current page index
   * @returns Observable with Collection result model which returns @see{@link UserPost} list
   */
  private getModifiedPostList(
    pageSize: number,
    pageIndex: number
  ): Observable<CollectionResult<UserPost>> {
    if (!this.userPostList || !this.userPostList.length) {
      return of({ totalCount: 0, items: [] });
    }
    return of({
      totalCount: this.userPostList.length,
      items: this.userPostList.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
      ),
    });
  }

  /**
   * Get specific post according to post ID
   * @param postId ID of post
   * @returns Specific ID type of @see{@link UserPost} or NULL
   */
  public getPost(postId: number): Observable<UserPost | null> {
    if (!this.userPostList || !this.userPostList.length) {
      return of(null);
    }
    const findPost = this.userPostList.find(
      (post: UserPost) => post.id === postId
    );
    if (findPost) {
      return of(findPost);
    }
    return of(null);
  }

  /**
   * Delete specific post according to Post ID
   * @param postId ID of post
   * @returns Observable TRUE if post is deleted successfully, otherwise
   * Observable FALSE
   */
  public deletePost(postId: number): Observable<boolean> {
    if (!this.userPostList || !this.userPostList.length) {
      return of(false);
    }
    const postIndex = this.userPostList.findIndex(
      (post: UserPost) => post.id === postId
    );
    if (postIndex !== -1) {
      this.userPostList.splice(postIndex, 1);
      return of(true);
    }
    return of(false);
  }

  /**
   * Updated specific post
   * @param updatedPost updated post
   * @returns Observable TRUE if post is updated successfully, otherwise
   * Observable FALSE
   */
  public updatePost(updatedPost: UserPost): Observable<boolean> {
    if (!this.userPostList || !this.userPostList.length) {
      return of(false);
    }
    const postIndex = this.userPostList.findIndex(
      (p: UserPost) => p.id === updatedPost.id
    );
    if (postIndex !== -1) {
      this.userPostList = this.userPostList.map((post: UserPost) => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      return of(true);
    }
    return of(false);
  }

  /**
   * Create post and add them in to @see{@link userPostList}
   * @param createdPost Created post type of @see{@link UserPost}
   * @returns Observable TRUE if post is created and added successfully, otherwise
   * Observable FALSE
   */
  public createPost(createdPost: UserPost): Observable<boolean> {
    if (!this.userPostList) {
      return of(false);
    }
    this.userPostList.unshift(createdPost);
    const postIndex = this.userPostList.findIndex(
      (post: UserPost) => post.id === createdPost.id
    );
    if (postIndex !== -1) {
      return of(true);
    }

    return of(false);
  }
}
