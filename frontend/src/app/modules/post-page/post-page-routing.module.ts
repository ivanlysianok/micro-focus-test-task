import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { CreatePostPageComponent } from './components/create-post/create-post-page.component';
import { UpdatePostPageComponent } from './components/update-post/update-post-page.component';

const routes: Routes = [
  {
    path: 'posts',
    children: [
      {
        path: 'create-post',
        component: CreatePostPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-post/:id',
        component: UpdatePostPageComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
