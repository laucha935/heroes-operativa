/* =================================================
  Angular and rxjs
================================================= */
import { Component, inject } from '@angular/core';

/* =================================================
  Services
================================================= */
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  /* services */
  private dialogService = inject(MatDialogRef);

  /* =================================================
  Functions
================================================= */
  actionsDelete(option?: string): void {
    if (option) {
      this.dialogService.close({
        event: 'delete',
      });
    } else {
      this.dialogService.close({});
    }
  }
}
