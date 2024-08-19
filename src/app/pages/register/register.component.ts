import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
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
export class RegisterComponent implements OnInit {
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
}
