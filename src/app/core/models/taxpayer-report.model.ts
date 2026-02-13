import { TaxReceipt } from './tax-receipt.model';

export interface TaxpayerReport {
  rncCedula: string;
  Name: string;
  TotalItbis: number;
  vouchers: TaxReceipt[];
}
