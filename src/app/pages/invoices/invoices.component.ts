import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { InvoicesTableComponent } from '@components/invoices-table/invoices-table.component';
import { InvoiceService } from '@services/invoice/invoice.service';
import { InvoiceRegister } from '../../shared/types/invoice-register.type';
import { InvoiceDialogComponent } from './../../shared/components/invoice-dialog/invoice-dialog.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [InvoicesTableComponent, RouterLink, MatButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {
  private dialog = inject(MatDialog);
  private invoiceService = inject(InvoiceService);
  matSnackBar = inject(MatSnackBar);

  openDialog(): void {
    const dialogRef = this.dialog.open(InvoiceDialogComponent);

    dialogRef.afterClosed().subscribe((result: InvoiceRegister) => {
      if (result) {
        this.invoiceService.store(result).subscribe(() => {
          this.matSnackBar.open('Cobrança cadastrada com sucesso!', 'X');
          window.location.reload();
        });
      }
    });
  }
}
