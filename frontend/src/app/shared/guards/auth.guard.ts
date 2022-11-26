import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  public async canActivate(): Promise<boolean> {
    const getUser = await this.authService.getUser().toPromise();

    if (!getUser) {
      this.router.navigate(['../../login'], {
        relativeTo: this.route,
      });
      return false;
    }
    return true;
  }
}
