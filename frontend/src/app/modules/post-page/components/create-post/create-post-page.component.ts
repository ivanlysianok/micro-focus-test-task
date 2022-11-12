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
import { User } from 'src/app/shared/models/user.interface';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss'],
})
export class CreatePostPageComponent implements OnInit {
  protected user: User | null = null;
  protected formGroup: FormGroup;
  protected getControlError = getControlError;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private postService: PostService
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
    const userDataFromLocaleStorage = localStorage.getItem('user');
    if (userDataFromLocaleStorage) {
      this.user = JSON.parse(userDataFromLocaleStorage);
    }
  }

  protected get title(): AbstractControl {
    return this.formGroup.controls['title'] as AbstractControl;
  }

  protected get body(): AbstractControl {
    return this.formGroup.controls['body'] as AbstractControl;
  }

  onNavigateToHomePage(): void {
    this.router.navigate(['../home-page'], { relativeTo: this.activatedRoute });
  }

  onCreatePost(): void {
    console.log(Math.floor(Math.random() * 1000) + 1000);
    if (!this.user || !this.formGroup.invalid) {
      return;
    }
    // const createPost: UserPost = {
    //   id:
    // }
  }
}
