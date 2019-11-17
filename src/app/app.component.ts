import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <div class="main">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'junction2019';
}
