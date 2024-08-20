import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CustomerRegister } from '../../types/customer-register.type';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-customer-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.scss',
})
export class CustomerDialogComponent {
  private dialogRef = inject(MatDialogRef<CustomerDialogComponent>);
  customer = signal<CustomerRegister | null>(null);

  customerForm = new FormGroup({
    name: new FormControl<string>(this.customer()?.name ?? '', {
      nonNullable: true,
      validators: Validators.required,
    }),
    document: new FormControl<string>(this.customer()?.document ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(11)],
    }),
    phone: new FormControl<string>(this.customer()?.phone ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{10,11}$/)],
    }),
    address: new FormControl<string>(this.customer()?.phone ?? '', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  onSave(): void {
    if (this.customerForm.valid) {
      this.dialogRef.close(this.customerForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
