import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatePostPageComponent } from './components/create-post/create-post-page.component';
import { UpdatePostPageComponent } from './components/update-post/update-post-page.component';

const routes: Routes = [
  {
    path: 'create-post',
    component: CreatePostPageComponent,
  },
  {
    path: 'edit-post/:id',
    component: UpdatePostPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostPageRoutingModule {}
