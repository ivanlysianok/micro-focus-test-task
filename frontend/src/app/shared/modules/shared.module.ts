import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from '../components/header/toolbar.component';
import { ControlErrorMessagePipe } from '../pipes/control-err-msg.pipe';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [ToolbarComponent, ControlErrorMessagePipe],
  imports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToolbarComponent,
    ControlErrorMessagePipe,
  ],
})
export class SharedModule {}
