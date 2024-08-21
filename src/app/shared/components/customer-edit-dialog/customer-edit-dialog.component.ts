import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CustomerDialogComponent } from '@components/customer-dialog/customer-dialog.component';
import { CustomerRegister } from '../../types/customer-register.type';

@Component({
  selector: 'app-customer-edit-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './customer-edit-dialog.component.html',
  styleUrl: './customer-edit-dialog.component.scss',
})
export class CustomerEditDialogComponent {
  private dialogRef = inject(MatDialogRef<CustomerDialogComponent>);
  customerData = inject<CustomerRegister>(MAT_DIALOG_DATA);

  customerForm = new FormGroup({
    name: new FormControl<string>(this.customerData?.name ?? '', {
      nonNullable: true,
      validators: Validators.required,
    }),
    document: new FormControl<string>(this.customerData?.document ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(11)],
    }),
    phone: new FormControl<string>(this.customerData?.phone ?? '', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern(/^\d{10,11}$/)],
    }),
    address: new FormControl<string>(this.customerData?.address ?? '', {
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
