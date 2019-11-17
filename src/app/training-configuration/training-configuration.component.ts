import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training-configuration',
  template: `
  <div class="content">
    <form name="trainingConfig" class="trainingConfig">
      <div class="radio">
        <label>Deadline for a challenge</label>
        <mat-radio-group
          aria-labelledby="example-radio-group-label"
          class="example-radio-group">
          <mat-radio-button class="example-radio-button" *ngFor="let season of deadlines" [value]="season">
            {{season}}
          </mat-radio-button>
        </mat-radio-group>
      </div>
      <div class="radio">
        <label>New challenge offer on rejection</label>
        <mat-radio-group
          aria-labelledby="example-radio-group-label"
          class="example-radio-group">
          <mat-radio-button class="example-radio-button" *ngFor="let season of rejection" [value]="season">
            {{season}}
          </mat-radio-button>
        </mat-radio-group>
      </div>
      <mat-checkbox class="example-margin">Get new challenges even if last has not yet been done</mat-checkbox>
      <br>
      <mat-checkbox class="example-margin">Allow my data for anonymous use</mat-checkbox>
    </form>
  </div>
  `,
  styleUrls: ['./training-configuration.component.scss']
})
export class TrainingConfigurationComponent implements OnInit {
  deadlines: string[] = ['none', 'daily', 'weekly'];
  rejection: string[] = ['tomorrow', 'give up to 3 in a day'];
  constructor() { }

  ngOnInit() {
  }

}
