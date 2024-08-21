import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { InvoiceResponse } from '../../types/invoice-response.type';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private readonly apiUrlEndpoint = `${environment.apiUrl}/invoices`;
  private httpClient = inject(HttpClient);

  index(customerId: number) {
    return this.httpClient.get<InvoiceResponse[]>(
      `${this.apiUrlEndpoint}/all/${customerId}`,
    );
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrlEndpoint}/${id}`);
  }
}
