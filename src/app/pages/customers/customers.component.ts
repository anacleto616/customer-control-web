import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDialogComponent } from '@components/customer-dialog/customer-dialog.component';
import { CustomersTableComponent } from '@components/customers-table/customers-table.component';
import { AuthService } from '@services/auth/auth.service';
import { CustomerService } from '@services/customer/customer.service';
import { CustomerRegister } from '../../shared/types/customer-register.type';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CustomersTableComponent],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class CustomersComponent {
  private dialog = inject(MatDialog);
  private customerService = inject(CustomerService);
  private authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  userId!: number | string | null;

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent);
    this.userId = this.authService.getUserId();

    dialogRef.afterClosed().subscribe((result: CustomerRegister) => {
      if (result) {
        result.userId = Number(this.userId);
        this.customerService.store(result).subscribe(() => {
          this.matSnackBar.open('Cliente cadastrado com sucesso!', 'X');
          window.location.reload();
        });
      }
    });
  }
}
