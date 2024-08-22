import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { InvoiceRegister } from '../../types/invoice-register.type';

@Component({
  selector: 'app-invoice-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './invoice-dialog.component.html',
  styleUrl: './invoice-dialog.component.scss',
})
export class InvoiceDialogComponent {
  private dialogRef = inject(MatDialogRef<InvoiceDialogComponent>);
  invoice = signal<InvoiceRegister | null>(null);

  invoiceForm = new FormGroup({
    description: new FormControl<string>(this.invoice()?.description ?? '', {
      nonNullable: true,
      validators: Validators.required,
    }),
    amount: new FormControl<number>(this.invoice()?.amount ?? 0, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    dueDate: new FormControl<Date>(this.invoice()?.dueDate ?? new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    }),
    paid: new FormControl<boolean>(this.invoice()?.paid ?? false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSave(): void {
    if (this.invoiceForm.valid) {
      this.dialogRef.close(this.invoiceForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
