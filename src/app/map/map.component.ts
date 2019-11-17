import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  template: `
  <div class="content">
    <ul>
      <li *ngFor="let link of map">
      <a [href]="link.link"><span>{{link.description}}</span></a>
      </li>
    </ul>
  </div>
  `,
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map = [
    {link: '', description: 'Welcome page, and short description about problem'},
    {link: 'no', description: 'Particular training description'},
    {link: 'myChallenges', description: 'List of all challenges which were assigned to user'},
    {link: 'administrator', description: 'Administration page for particular training. Should be used by health care specialist.'},
    {link: 'map', description: ':) Current page, with description of all content'},
    {link: 'training-config', description: 'Configure challenges subscription for a device'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
