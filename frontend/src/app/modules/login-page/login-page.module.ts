import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { LoginPageComponent } from './components/login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
@NgModule({
  declarations: [LoginPageComponent],
  imports: [SharedModule, LoginPageRoutingModule],
  exports: [LoginPageComponent],
})
export class LoginPageModule {}
