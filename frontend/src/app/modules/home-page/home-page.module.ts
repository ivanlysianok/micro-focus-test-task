import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { HomePageComponent } from './components/home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [SharedModule, HomePageRoutingModule],
  exports: [HomePageComponent],
})
export class HomePageModule {}
