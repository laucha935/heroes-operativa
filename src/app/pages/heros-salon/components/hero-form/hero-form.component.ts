import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
})
export class HeroFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: string; heroeInfo: any }
  ) {}
  private dialogService: MatDialogRef<HeroFormComponent> = inject(MatDialogRef);

  heroInfoForm = new FormGroup({
    heroName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    heroId: new FormControl('', [Validators.required, Validators.minLength(3)]),
    heroDescription: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  ngOnInit(): void {
    if (this.data.type === 'edit') {
      this.heroInfoForm.controls['heroName'].setValue(this.data.heroeInfo.name),
        this.heroInfoForm.controls['heroId'].setValue(this.data.heroeInfo.id),
        this.heroInfoForm.controls['heroDescription'].setValue(
          this.data.heroeInfo.description
        );
    }
  }

  actionsForm(option?: string): void {
    if (option) {
      this.dialogService.close({
        event: 'close',
      });
    } else {
      this.dialogService.close({
        event: this.data.type,
        data: this.heroInfoForm.value,
      });
    }
  }
}
