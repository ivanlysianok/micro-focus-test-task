import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page.component';

const routes: Routes = [
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: '',
    redirectTo: 'home-page',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
