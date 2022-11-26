import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPost } from '../../../shared/models/user-post.interface';
import { User } from '../../../shared/models/user.interface';
import { AuthService } from '../../../shared/services/auth.service';
import { PostService } from '../../../shared/services/post.service';
import { NAVIGATION_ROUTES } from '../constants/navigation-routes.const';
import { PAGINATION_DATA } from '../constants/pagination-data.const';
import { TABLE_COLUMNS } from '../constants/table-columns.conts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected user: User | null = null;
  protected postsWithUsersList: UserPost[] = [];
  protected userIsLoggedIn?: boolean;

  protected TABLE_COLUMNS = TABLE_COLUMNS;
  protected NAVIGATION_ROUTES = NAVIGATION_ROUTES;

  protected pageSize = PAGINATION_DATA.SIZE;
  private pageIndex = PAGINATION_DATA.INDEX;
  protected totalLength = 0;

  private subscriptionsList: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.loadPosts();
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private getUser(): void {
    this.subscriptionsList.push(
      this.authService.getUser().subscribe((user: User | null) => {
        if (!user) {
          this.user = user;
          this.userIsLoggedIn = false;
          return;
        }
        this.user = user;
        this.userIsLoggedIn = true;
      })
    );
  }

  private loadPosts(): void {
    this.subscriptionsList.push(
      this.postService
        .getUserPostList(this.pageSize, this.pageIndex)
        .subscribe((response) => {
          if (!response || !response.items) {
            return;
          }
          this.postsWithUsersList = response.items;
          this.totalLength = response.totalCount;
        })
    );
  }

  protected onLogout(): void {
    if (!this.user) {
      return;
    }
    this.subscriptionsList.push(
      this.authService.logout().subscribe((response: boolean) => {
        if (!response) {
          return;
        }

        this.getUser();
        this.loadPosts();
      })
    );
  }

  protected onPageChange(pageEvent: PageEvent): void {
    this.pageIndex = pageEvent.pageIndex;
    this.loadPosts();
  }

  protected onNavigateToRoute(route: string): void {
    this.router.navigate(['../' + route], {
      relativeTo: this.activatedRoute,
    });
  }

  protected onNavigateToEditPost(postId: number, userId: number): void {
    if (!this.user) {
      return;
    }
    if (this.user.id === userId) {
      this.router.navigate(['../posts/edit-post/' + postId], {
        relativeTo: this.activatedRoute,
      });
    }
  }
}
