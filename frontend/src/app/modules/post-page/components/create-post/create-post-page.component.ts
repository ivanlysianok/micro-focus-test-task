import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';

@Component({
  selector: 'app-create-post-page',
  templateUrl: './create-post-page.component.html',
  styleUrls: ['./create-post-page.component.scss'],
})
export class CreatePostPageComponent implements OnInit {
  protected user: User | null = null;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onNavigateToHomePage(): void {
    this.router.navigate(['../home-page'], { relativeTo: this.activatedRoute });
  }
}
