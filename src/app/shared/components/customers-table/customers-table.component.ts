import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CustomerService } from '@services/customer/customer.service';
import { CustomerDetails } from '../../types/customer-details.type';

@Component({
  selector: 'app-customers-table',
  standalone: true,
  imports: [MatIconModule, RouterLink, MatButtonModule],
  templateUrl: './customers-table.component.html',
  styleUrl: './customers-table.component.scss',
})
export class CustomersTableComponent implements OnInit {
  customerService = inject(CustomerService);
  columns: string[] = ['Nome', 'Pagos', 'Abertos', 'Atrasados', '', '', ''];

  customers = signal<CustomerDetails[]>([]);

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService
      .index()
      .subscribe((customer) => this.customers.set(customer));
  }
}
