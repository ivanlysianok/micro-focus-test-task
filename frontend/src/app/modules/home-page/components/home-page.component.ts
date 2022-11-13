import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPost } from 'src/app/shared/models/user-post.interface';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { TABLE_COLUMNS } from '../constants/table-columns.conts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  protected user: User | null = null;
  protected postsWithUsersList: UserPost[] = [];
  protected tableColumns: string[] = [];
  protected userIsLoggedIn?: boolean;

  protected pageSize = 10;
  private pageIndex = 0;
  protected totalLength = 0;

  private postsWithUsersSub = new Subscription();
  private logoutSub = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.loadPosts();
    this.tableColumns = TABLE_COLUMNS;
  }

  ngOnDestroy(): void {
    this.postsWithUsersSub.unsubscribe();
    this.logoutSub.unsubscribe();
  }

  private loadPosts(): void {
    this.postsWithUsersSub = this.postService
      .getUserPostList(this.pageSize, this.pageIndex)
      .subscribe((response) => {
        if (!response || !response.items) {
          return;
        }
        this.postsWithUsersList = response.items;
        this.totalLength = response.totalCount;
      });
  }

  private getUser(): void {
    this.user = null;
    this.userIsLoggedIn = false;
    const getUserFromLocalStorage = localStorage.getItem('user');

    if (getUserFromLocalStorage) {
      this.user = JSON.parse(getUserFromLocalStorage);
      this.userIsLoggedIn = true;
    }
  }

  protected onNavigateToCompanyWeb(websiteUrl: string | null): void {
    // !!! IMHO website url is in incorrect format. Url should start with http / https !!!
    if (!websiteUrl) {
      return;
    }
    location.href = 'http://' + websiteUrl;
  }

  protected onLogout(): void {
    if (!this.user) {
      return;
    }
    this.logoutSub = this.authService
      .logout()
      .subscribe((response: boolean) => {
        if (!response) {
          return;
        }

        this.getUser();
        this.loadPosts();
      });
  }

  protected onPageChange(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.loadPosts();
  }

  protected onNavigateToRoute(routePath: string): void {
    this.router.navigate(['../' + routePath], {
      relativeTo: this.activatedRoute,
    });
  }

  protected onNavigateToEditPost(postId: number, userId: number): void {
    if (!this.user) {
      return;
    }
    if (this.user.id === userId) {
      this.router.navigate(['../edit-post/' + postId], {
        relativeTo: this.activatedRoute,
      });
    }
  }
}
