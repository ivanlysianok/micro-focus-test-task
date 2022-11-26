import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NOTIFICATION } from '../../../../shared/constants/notification.const';
import { UserPost } from '../../../../shared/models/user-post.interface';
import { NotificationService } from '../../../../shared/services/notification.service';
import { PostService } from '../../../../shared/services/post.service';
import { CONFIRMATION_DIALOG } from '../../constants/confirmation-dialog.const';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-update-post-page',
  templateUrl: './update-post-page.component.html',
})
export class UpdatePostPageComponent implements OnInit, OnDestroy {
  protected userPost: UserPost | null = null;
  protected formGroup: FormGroup;
  private subscriptionsList: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.formGroup = this.formBuilder.group({
      title: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(200),
      ]),
      body: new FormControl<string | null>(null, [
        Validators.required,
        Validators.maxLength(2000),
      ]),
    });
  }

  protected get title(): AbstractControl {
    return this.formGroup.controls['title'] as AbstractControl;
  }

  protected get body(): AbstractControl {
    return this.formGroup.controls['body'] as AbstractControl;
  }

  ngOnInit(): void {
    const postId = this.activatedRoute.snapshot.paramMap.get('id') as string;
    if (postId) {
      this.subscriptionsList.push(
        this.postService
          .getPost(Number(postId))
          .subscribe((response: UserPost | null) => {
            if (!response) {
              return;
            }
            this.userPost = response;
          })
      );
    }
    this.patchFormGroup();
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach((sub: Subscription) => sub.unsubscribe());
  }

  private patchFormGroup(): void {
    if (!this.userPost) {
      return;
    }

    this.formGroup.patchValue({
      title: this.userPost.title,
      body: this.userPost.body,
    });

    this.title.markAsDirty();
    this.body.markAsDirty();
  }

  protected onDeletePost(): void {
    if (!this.userPost || !this.userPost.id) {
      return;
    }
    this.dialog
      .open<ConfirmationDialogComponent>(ConfirmationDialogComponent, {
        data: {
          header: CONFIRMATION_DIALOG.DELETE_HEADER,
          text: CONFIRMATION_DIALOG.DELETE_TEXT,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (!result || !this.userPost?.id) {
          return;
        }
        this.subscriptionsList.push(
          this.postService
            .deletePost(this.userPost.id)
            .subscribe((response: boolean) => {
              if (!response) {
                return;
              }
              this.notificationService.showNotification(
                NOTIFICATION.POST_DELETED
              );
              this.onNavigateToHomePage();
            })
        );
      });
  }

  protected onUpdatePost(): void {
    if (this.formGroup.invalid || !this.userPost) {
      return;
    }
    const updatedPost: UserPost = {
      id: this.userPost.id,
      userId: this.userPost.userId,
      title: this.title.value,
      body: this.body.value,
      user: this.userPost.user,
    };
    this.subscriptionsList.push(
      this.postService
        .updatePost(updatedPost)
        .subscribe((response: boolean) => {
          if (!response) {
            return;
          }
          this.notificationService.showNotification(NOTIFICATION.POST_UPDATED);
          this.onNavigateToHomePage();
        })
    );
  }

  protected onNavigateToHomePageWithConfirmation(): void {
    this.dialog
      .open<ConfirmationDialogComponent>(ConfirmationDialogComponent, {
        data: {
          header: CONFIRMATION_DIALOG.LEAVE_HEADER,
          text: CONFIRMATION_DIALOG.LEAVE_TEXT,
        },
      })
      .afterClosed()
      .subscribe((result: boolean) => {
        if (!result) {
          return;
        }
        this.onNavigateToHomePage();
      });
  }

  private onNavigateToHomePage(): void {
    this.router.navigate(['../../../home-page'], {
      relativeTo: this.activatedRoute,
    });
  }
}
