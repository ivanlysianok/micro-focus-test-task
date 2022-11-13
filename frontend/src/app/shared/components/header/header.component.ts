import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() userName?: string;
  @Input() isLoggedIn?: boolean;
  @Input() headerText = '';
  @Input() showHomePageButton = false;

  @Output() homePageButtonClick: EventEmitter<unknown> =
    new EventEmitter<unknown>();
}
