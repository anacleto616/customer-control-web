export interface InvoiceResponse {
  id: number;
  description: string;
  amount: number;
  dueDate: Date;
  status: string;
}
