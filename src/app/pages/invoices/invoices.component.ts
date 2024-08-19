import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { InvoicesTableComponent } from '@components/invoices-table/invoices-table.component';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [InvoicesTableComponent, RouterLink, MatButtonModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent {}
