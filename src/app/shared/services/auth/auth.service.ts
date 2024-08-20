import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserLogin } from '../../types/user-login.type';
import { UserRegister } from '../../types/user-register.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrlEndpoint = `${environment.apiUrl}/users`;
  httpClient = inject(HttpClient);

  userResgister(user: UserRegister) {
    return this.httpClient.post<UserRegister>(
      `${this.apiUrlEndpoint}/register`,
      user,
    );
  }

  login(credentials: UserLogin) {
    return this.httpClient.post<string>(
      `${this.apiUrlEndpoint}/login`,
      credentials,
    );
  }
}
