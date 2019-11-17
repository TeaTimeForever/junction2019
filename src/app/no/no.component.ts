import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no',
  template: `
<div class="content">
  <h2>Getting to "NO"</h2>
  <p>We all want to get to yes, but what happens when the other person keeps saying no?</p>
  <p>How can you negotiate successfully with a stubborn boss, an irate customer, or a deceitful classmates?</p>
  <p>You’ll learn how to:</p>
  <ul>
    <li>Stay in control under pressure</li>
    <li>Defuse anger and hostility</li>
    <li>Find out what the other side really wants</li>
    <li>Counter dirty tricks</li>
    <li>Use power to bring the other side back to the table</li>
    <li>Reach agreements that satisfies both sides' needs</li>
  </ul>
  <p>Getting to "No" is the challanges on negotiation for the twenty-first century. It will help you deal with tough times, tough people, and tough negotiations. You don’t have to get mad or get even. Instead, you can get what you want!</p>
  <button mat-raised-button color="primary" [routerLink]="['/training-config']">Start</button>
</div>

  `,
  styleUrls: ['./no.component.scss']
})
export class NoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
