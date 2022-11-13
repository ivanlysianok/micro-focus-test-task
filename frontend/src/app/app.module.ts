import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageModule } from './modules/home-page/home-page.module';
import { LoginPageModule } from './modules/login-page/login-page.module';
import { PostPageModule } from './modules/post-page/post-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HomePageModule,
    LoginPageModule,
    PostPageModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
