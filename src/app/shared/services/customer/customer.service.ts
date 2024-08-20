import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CustomerDetails } from '../../types/customer-details.type';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrlEndpoint = `${environment.apiUrl}/customers`;
  httpClient = inject(HttpClient);

  index() {
    return this.httpClient.get<CustomerDetails[]>(`${this.apiUrlEndpoint}`);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrlEndpoint}/${id}`);
  }
}
