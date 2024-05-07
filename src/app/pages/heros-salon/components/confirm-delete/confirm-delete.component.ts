import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss'],
})
export class ConfirmDeleteComponent {
  private dialogService = inject(MatDialogRef);

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
