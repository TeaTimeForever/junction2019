import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-challenges',
  template: `
<div class="content">
  <mat-accordion>
    <div *ngFor="let challenge of challenges; let i = index;">
      <mat-expansion-panel [expanded]="i === activeChallenge" (opened)="activeChallenge = i" hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{challenge.title}}
          </mat-panel-title>
          <mat-panel-description>
          {{challenge.status}}
          </mat-panel-description>
        </mat-expansion-panel-header>
        <div class="card-content">
          <p>{{challenge.question}}</p>
          <img [src]="challenge.imageUrl" alt="">
        </div>
      </mat-expansion-panel>
    </div>
  </mat-accordion>
</div>
  `,
  styleUrls: ['./my-challenges.component.scss']
})
export class MyChallengesComponent implements OnInit {

  constructor() { }

  challenges = [{
    status: 'active',
    question: 'Lorem ipsum dolor sit amet ipsum dolor sit amet',
    title: 'Lalal alala',
    imageUrl: 'https://d3ursa3zzwkanm.cloudfront.net/assets/custom_domains/procter_gamble/pg_challenge_step_5-4d8cc984e7cd82bc87c0b0767437cc290e87b3d617f2c8d2ff0edd79f1947e25.png'
  }, {
    status: 'rejected',
    question: 'Lorem ipsum dolor sit amet ipsum dolor sit amet',
    title: 'Lalal alala',
    imageUrl: 'https://d3ursa3zzwkanm.cloudfront.net/assets/custom_domains/procter_gamble/pg_challenge_step_5-4d8cc984e7cd82bc87c0b0767437cc290e87b3d617f2c8d2ff0edd79f1947e25.png'
  }, {
    status: 'done',
    started_at: new Date(),
    finished_at: new Date(),
    question: 'Lorem ipsum dolor sit amet ipsum dolor sit amet',
    title: 'Lalal alala',
    imageUrl: 'https://d3ursa3zzwkanm.cloudfront.net/assets/custom_domains/procter_gamble/pg_challenge_step_5-4d8cc984e7cd82bc87c0b0767437cc290e87b3d617f2c8d2ff0edd79f1947e25.png'
  }];

  activeChallenge = 0;
  ngOnInit() {
    
  }

}
