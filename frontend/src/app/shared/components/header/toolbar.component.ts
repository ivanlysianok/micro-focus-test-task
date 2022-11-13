import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() userName?: string;
  @Input() userIsLoggedIn?: boolean;
  @Input() header = '';
  @Input() showHomePageButton = false;

  @Output() homePageButtonClick: EventEmitter<unknown> =
    new EventEmitter<unknown>();
}
