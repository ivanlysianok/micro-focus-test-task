import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserPost } from 'src/app/shared/models/user-post.interface';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';
import { PAGINATION_DATA } from '../constants/pagination-data.const';
import { TABLE_COLUMNS } from '../constants/table-columns.conts';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit, OnDestroy {
  protected user: User | null = null;
  protected postsWithUsersList: UserPost[] = [];
  protected tableColumns = TABLE_COLUMNS;
  protected userIsLoggedIn?: boolean;
  public postActionStateMessage = '';

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
    this.userPostActionMessageSub();
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private userPostActionMessageSub(): void {
    this.subscriptionsList.push(
      this.postService
        .getUserPostActionMessage()
        .subscribe((response: string | null) => {
          if (!response) {
            return;
          }
          this.postActionStateMessage = response;
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
        this.resetUserPostActionMessage();
      })
    );
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

  private resetUserPostActionMessage(): void {
    this.postService.userPostActionMessage = null;
    this.postActionStateMessage = '';
  }
}
