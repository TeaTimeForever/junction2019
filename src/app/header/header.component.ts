import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
  <mat-toolbar>
    <mat-toolbar-row class="header">
      <span>Upbeat</span>
      <button mat-button class="accent">Login</button>
    </mat-toolbar-row>
  </mat-toolbar>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
