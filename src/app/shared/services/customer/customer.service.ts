import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CustomerDetails } from '../../types/customer-details.type';
import { CustomerRegister } from '../../types/customer-register.type';
import { CustomerSummary } from '../../types/customer-summary.type';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrlEndpoint = `${environment.apiUrl}/customers`;
  private httpClient = inject(HttpClient);

  index(userId: number) {
    return this.httpClient.get<CustomerDetails[]>(
      `${this.apiUrlEndpoint}/all/${userId}`,
    );
  }

  getOne(id: number) {
    return this.httpClient
      .get<CustomerSummary>(`${this.apiUrlEndpoint}/${id}`)
      .pipe(map((response: CustomerSummary) => response));
  }

  store(customer: CustomerRegister) {
    return this.httpClient.post(this.apiUrlEndpoint, customer);
  }

  update(id: number, customer: CustomerRegister) {
    return this.httpClient.put(`${this.apiUrlEndpoint}/${id}`, customer);
  }

  delete(id: number) {
    return this.httpClient.delete(`${this.apiUrlEndpoint}/${id}`);
  }
}
