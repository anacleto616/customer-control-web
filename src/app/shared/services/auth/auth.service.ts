import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { LoginResponse } from '../../types/login-reponse.type';
import { UserLogin } from '../../types/user-login.type';
import { UserRegister } from '../../types/user-register.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrlEndpoint = `${environment.apiUrl}/users`;
  private httpClient = inject(HttpClient);
  private userIdSubject = new BehaviorSubject<number | string | null>(null);
  userId$ = this.userIdSubject.asObservable();

  userResgister(user: UserRegister) {
    return this.httpClient.post<UserRegister>(
      `${this.apiUrlEndpoint}/register`,
      user,
    );
  }

  login(credentials: UserLogin) {
    return this.httpClient.post<LoginResponse>(
      `${this.apiUrlEndpoint}/login`,
      credentials,
    );
  }

  setUserId(userId: number): void {
    this.userIdSubject.next(userId);
    localStorage.setItem('userId', userId.toString());
  }

  getUserId(): number | string | null {
    const id = Number(localStorage.getItem('userId'));
    return this.userIdSubject.value || id || null;
  }
}
