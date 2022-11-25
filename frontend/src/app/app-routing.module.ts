import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home-page/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login-page/login-page.module').then(
        (module) => module.LoginPageModule
      ),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./modules/post-page/post-page.module').then(
        (module) => module.PostPageModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
