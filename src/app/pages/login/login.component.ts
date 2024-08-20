import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';
import { UserLogin } from '../../shared/types/user-login.type';
import { UserRegister } from '../../shared/types/user-register.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  user = signal<UserRegister | null>(null);
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl<string>(this.user()?.name ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      email: new FormControl<string>(this.user()?.email ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
      password: new FormControl<string>(this.user()?.password ?? '', {
        nonNullable: true,
        validators: Validators.required,
      }),
    });
  }

  onLogin() {
    const credentials = this.form.value as UserLogin;
    this.authService.login(credentials).subscribe((response) => {
      localStorage.setItem('token', response);
      this.router.navigate(['/customers']);
    });
  }
}
