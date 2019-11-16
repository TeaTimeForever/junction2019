import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap, map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Challenge, UserChallenge } from 'functions/src/user';

@Component({
  selector: 'app-my-challenges',
  template: `
<div class="content">
  <mat-accordion>
    <div *ngFor="let challenge of challenges$ | async; let i = index;">
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
          <img [src]="challenge.imgUrl" alt="">
        </div>
      </mat-expansion-panel>
    </div>
  </mat-accordion>
</div>
  `,
  styleUrls: ['./my-challenges.component.scss']
})
export class MyChallengesComponent {
  /**
   * A stream that lists the challenges that have been added to user,
   * but does not include ones coming from the whole training (if they haven't been added to user))
   */
  challenges$ = this.afs.collection<UserChallenge>('users/17/challenges').valueChanges({ idField: 'id' }).pipe(
    switchMap(userChallenges =>
      combineLatest(userChallenges.map(userChallenge =>
        this.afs.doc<Challenge>(`gettingToNo/general/challenges/${userChallenge.id}`).valueChanges().pipe(
          map(challenge => ({...userChallenge, ...challenge})) // merge both objects together
        ))))
  );

  constructor(private afs: AngularFirestore) { }

  /*
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
  */

  activeChallenge = 0;
}
