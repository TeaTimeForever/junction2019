import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Challenge } from 'functions/src/user';

@Component({
  selector: 'app-admin',
  template: `
  <div class="content">
  <mat-accordion>
    <mat-expansion-panel class="firstLine" hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
            <button mat-button color="primary">Add new challenge</button>
          </mat-panel-title>
        </mat-expansion-panel-header>
        <div class="formContainer">
          <form name="newChallenge" class="newChallengeForm">
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Title" name="title" [(ngModel)]="newChallenge.title">
            </mat-form-field>
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Description" name="description" [(ngModel)]="newChallenge.description">
            </mat-form-field>
            <mat-form-field class="example-full-width">
              <input matInput placeholder="Image link" name="imageUrl" [(ngModel)]="newChallenge.imageUrl">
            </mat-form-field>
          </form>
          <img class="imagePreview" [src]="newChallenge.imageUrl" alt="">
        </div>
        <button mat-button color="primary">Save</button>
      </mat-expansion-panel>
    <div *ngFor="let challenge of challenges$ | async; let i = index;">
      <mat-expansion-panel hideToggle>
        <mat-expansion-panel-header>
          <mat-panel-title>
            {{challenge.title}}
          </mat-panel-title>
          <mat-panel-description>
          <mat-chip-list aria-label="Fish selection">
            <mat-chip *ngFor="let tag of challenge.tags"
                      [color]="tag === 'popular'? 'primary' : 'accent'" selected>{{tag}}</mat-chip>
          </mat-chip-list>
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
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  challenges$ = this.afs.collection<Challenge>('gettingToNo/general/challenges').valueChanges();
  newChallenge = {
    title: '',
    description: '',
    imageUrl: ''
  };

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
  }

}
