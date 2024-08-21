import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { CustomerEditDialogComponent } from '@components/customer-edit-dialog/customer-edit-dialog.component';
import { AuthService } from '@services/auth/auth.service';
import { ConfirmationDialogService } from '@services/confirmation-dialog/confirmation-dialog.service';
import { CustomerService } from '@services/customer/customer.service';
import { filter } from 'rxjs';
import { CustomerDetails } from '../../types/customer-details.type';
import { CustomerRegister } from '../../types/customer-register.type';
import { CustomerSummary } from '../../types/customer-summary.type';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent implements OnInit {
  private dialog = inject(MatDialog);
  customerService = inject(CustomerService);
  confirmationDialogService = inject(ConfirmationDialogService);
  matSnackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  userId!: number | string | null;
  customerLoad!: CustomerSummary;
  columns: string[] = ['Nome', 'Pagos', 'Abertos', 'Atrasados', '', '', ''];

  customers = signal<CustomerDetails[]>([]);

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.userId = this.authService.getUserId();

    this.customerService
      .index(Number(this.userId))
      .subscribe((customer) => this.customers.set(customer));
  }

  loadOneCustomer(id: number) {
    return this.customerService
      .getOne(id)
      .subscribe((response: CustomerSummary) => (this.customerLoad = response));
  }

  onDelete(id: number) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.customerService.delete(id).subscribe(() => this.loadCustomers());
      });
  }

  openEdit(customerId: number) {
    this.customerService
      .getOne(customerId)
      .pipe(filter((response: CustomerSummary) => !!response))
      .subscribe((customerLoad: CustomerSummary) => {
        const dialogRef = this.dialog.open(CustomerEditDialogComponent, {
          data: customerLoad,
        });

        dialogRef.afterClosed().subscribe((result: CustomerRegister) => {
          if (result) {
            this.userId = this.authService.getUserId();
            result.userId = Number(this.userId);
            this.customerService.update(customerId, result).subscribe({
              next: () => {
                this.matSnackBar.open('Cliente atualizado com sucesso!', 'X');
                this.loadCustomers();
              },
              error: () =>
                this.matSnackBar.open('Erro ao atualizar cliente.', 'X'),
            });
          }
        });
      });
  }
}
