import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  protected user: User | null = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.user = null;
    const userDataFromLocaleStorage = localStorage.getItem('user');
    if (userDataFromLocaleStorage) {
      this.user = JSON.parse(userDataFromLocaleStorage);
    }
  }

  protected onNavigateToLoginPage(): void {
    this.router.navigate(['../login'], { relativeTo: this.activatedRoute });
  }

  protected onLogout(): void {
    if (this.user) {
      this.authService.logout().subscribe((response: boolean) => {
        if (response) {
          this.getUser();
        }
      });
    }
  }
}
