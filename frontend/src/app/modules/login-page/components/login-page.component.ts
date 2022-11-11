import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  protected formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.formGroup = this.formBuilder.group({
      userName: new FormControl<string | null>(null),
    });
  }

  protected get userName(): AbstractControl {
    return this.formGroup.controls['userName'] as AbstractControl;
  }

  protected onLogin(): void {
    if (!this.userName.value) {
      return;
    }
    this.authService
      .login(this.userName.value)
      .subscribe((response: boolean) => {
        if (response) {
          this.router.navigate(['../home-page'], {
            relativeTo: this.activatedRoute,
          });
        } else {
          this.userName.setErrors({ invalidUser: true });
        }
      });
  }
}
