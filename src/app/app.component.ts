import { Component } from '@angular/core';
import { AuthenticationService } from './_services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private authenticationService: AuthenticationService) {
  }

  get user(): User {
    return this.authenticationService.currentUser;
  }

  title = 'snappcar-challenge-frontend';
}
