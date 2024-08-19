import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-invoices-table',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.scss',
})
export class InvoicesTableComponent {
  columns: string[] = ['Descrição', '', 'Valor', 'Vencimento', '', ''];
}
