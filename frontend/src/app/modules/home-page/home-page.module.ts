import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { PostService } from 'src/app/shared/services/post.service';
import { HomePageComponent } from './components/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [SharedModule, HomePageRoutingModule],
  exports: [HomePageComponent],
  providers: [PostService],
})
export class HomePageModule {}
