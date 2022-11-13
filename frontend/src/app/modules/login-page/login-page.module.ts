import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoginPageComponent } from './components/login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
@NgModule({
  declarations: [LoginPageComponent],
  imports: [SharedModule, LoginPageRoutingModule],
  providers: [AuthService],
})
export class LoginPageModule {}
