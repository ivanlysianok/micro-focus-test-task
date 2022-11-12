import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getControlError } from 'src/app/shared/functions/get-control-error.function';
import { UserPost } from 'src/app/shared/models/user-post.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-update-post-page',
  templateUrl: './update-post-page.component.html',
  styleUrls: ['./update-post-page.component.scss'],
})
export class UpdatePostPageComponent implements OnInit {
  protected userPost: UserPost | null = null;
  protected formGroup: FormGroup;
  protected getControlError = getControlError;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private formBuilder: FormBuilder
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
      this.postService
        .getPostByPostId(Number(postId))
        .subscribe((response: UserPost | null) => {
          if (!response) {
            return;
          }
          this.userPost = response;
        });
    }
    this.patchFormGroup();
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

  protected onNavigateToHomePage(): void {
    this.router.navigate(['../../home-page'], {
      relativeTo: this.activatedRoute,
    });
  }

  protected onDeletePost(): void {
    //
  }

  protected onSavePost(): void {
    //
  }
}
