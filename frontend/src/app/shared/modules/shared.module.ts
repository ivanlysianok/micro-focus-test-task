import { NgModule } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [MaterialModule],
  exports: [MaterialModule, HeaderComponent],
})
export class SharedModule {}
