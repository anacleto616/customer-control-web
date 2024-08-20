import { Component, inject, signal } from '@angular/core';
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
import { UserRegister } from '../../shared/types/user-register.type';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatFormFieldModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  authService = inject(AuthService);
  matSnackBar = inject(MatSnackBar);
  router = inject(Router);
  user = signal<UserRegister | null>(null);

  form = new FormGroup({
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

  onRegisterUser() {
    const user = this.form.value as UserRegister;
    this.authService.userResgister(user).subscribe(() => {
      this.matSnackBar.open('Usuário cadastrado com sucesso!', 'X');
    });

    this.router.navigateByUrl('/');
  }
}
