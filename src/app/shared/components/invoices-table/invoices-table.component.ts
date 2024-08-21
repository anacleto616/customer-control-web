import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationDialogService } from '@services/confirmation-dialog/confirmation-dialog.service';
import { InvoiceService } from '@services/invoice/invoice.service';
import { InvoiceResponse } from '../../types/invoice-response.type';
import { filter } from 'rxjs';

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.scss',
})
export class InvoicesTableComponent implements OnInit {
  private dialog = inject(MatDialog);
  invoiceService = inject(InvoiceService);
  invoices = signal<InvoiceResponse[]>([]);
  confirmationDialogService = inject(ConfirmationDialogService);
  matSnackBar = inject(MatSnackBar);
  route = inject(ActivatedRoute);
  customerId: number | string | null = null;
  columns: string[] = ['Descrição', '', 'Valor', 'Vencimento', '', ''];

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.customerId = params.get('customerId');
      if (this.customerId) {
        this.loadInvoices(Number(this.customerId));
      }
    });
  }

  loadInvoices(customerId: number): void {
    this.invoiceService.index(customerId).subscribe({
      next: (invoice) => {
        console.log(invoice);

        this.invoices.set(invoice);
      },
      error: () => this.matSnackBar.open('Erro ao carregar faturas.', 'X'),
    });
  }

  onDelete(id: number) {
    this.confirmationDialogService
      .openDialog()
      .pipe(filter((answer) => answer))
      .subscribe(() => {
        this.invoiceService
          .delete(id)
          .subscribe(() => this.loadInvoices(Number(this.customerId)));
      });
  }
}
