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
import { NotificationService } from '../../../..//shared/services/notification.service';
import { getControlErrorMessage } from '../../../../shared/functions/get-control-error-message.function';
import { UserPost } from '../../../../shared/models/user-post.interface';
import { User } from '../../../../shared/models/user.interface';
import { AuthService } from '../../../../shared/services/auth.service';
import { PostService } from '../../../../shared/services/post.service';
import { CONFIRMATION_DIALOG_CONTENT } from '../../constants/confirmation-dialog-content.const';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
})
export class CreatePostPageComponent implements OnInit, OnDestroy {
  protected user: User | null = null;
  protected formGroup: FormGroup;
  protected getControlErrorMessage = getControlErrorMessage;
  private subscriptionsList: Subscription[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private notificationService: NotificationService,
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

  ngOnInit(): void {
    this.subscriptionsList.push(
      this.authService.getUser().subscribe((user: User | null) => {
        if (!user) {
          return;
        }
        this.user = user;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptionsList.forEach((sub: Subscription) => sub.unsubscribe());
  }

  protected get title(): AbstractControl {
    return this.formGroup.controls['title'] as AbstractControl;
  }

  protected get body(): AbstractControl {
    return this.formGroup.controls['body'] as AbstractControl;
  }

  private onNavigateToHomePage(): void {
    this.router.navigate(['../home-page'], { relativeTo: this.activatedRoute });
  }

  protected onNavigateToHomePageWithConfirmation(): void {
    this.dialog
      .open<ConfirmationDialogComponent>(ConfirmationDialogComponent, {
        data: {
          header: CONFIRMATION_DIALOG_CONTENT.HEADER,
          text: CONFIRMATION_DIALOG_CONTENT.TEXT,
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

  protected onCreatePost(): void {
    if (!this.user || this.formGroup.invalid) {
      return;
    }
    const createdPost: UserPost = {
      id: Math.floor(Math.random() * 1000) + 1000,
      userId: this.user.id,
      title: this.title.value,
      body: this.body.value,
      user: this.user,
    };
    if (createdPost) {
      this.subscriptionsList.push(
        this.postService.createPost(createdPost).subscribe((response) => {
          if (!response) {
            return;
          }
          this.notificationService.showNotification('Hello');
          this.onNavigateToHomePage();
        })
      );
    }
  }
}
