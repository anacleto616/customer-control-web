export interface InvoiceRegister {
  description: string;
  amount: number;
  dueDate: Date;
  paid: boolean;
  customerId: number;
}
