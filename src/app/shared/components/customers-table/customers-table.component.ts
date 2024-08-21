import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CustomerDialogComponent } from '@components/customer-dialog/customer-dialog.component';
import { AuthService } from '@services/auth/auth.service';
import { ConfirmationDialogService } from '@services/confirmation-dialog/confirmation-dialog.service';
import { CustomerService } from '@services/customer/customer.service';
import { filter } from 'rxjs';
import { CustomerDetails } from '../../types/customer-details.type';

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
  private authService = inject(AuthService);
  userId!: number | string | null;
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

  onDelete(id: number) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.customerService.delete(id).subscribe(() => this.loadCustomers());
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Dados do cliente:', result);
        // Lógica para salvar os dados do cliente
      }
    });
  }
}
