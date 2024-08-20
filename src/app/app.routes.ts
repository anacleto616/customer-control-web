import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { CustomersComponent } from './pages/customers/customers.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'customers',
    component: CustomersComponent,
    canActivate: [authGuard],
  },
  {
    path: 'invoices',
    component: InvoicesComponent,
    canActivate: [authGuard],
  },
];
