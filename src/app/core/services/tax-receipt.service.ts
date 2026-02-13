import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaxReceipt, TaxpayerReport, TaxReceiptList } from '../models';
import { ErrorHandlerService } from './error-handler.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TaxReceiptService {
  private readonly API_URL = `${environment.apiUrl}/api/TaxReceipt`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private logger: LoggerService
  ) { }

  getAll(): Observable<TaxReceipt[]> {
    this.logger.log('GET /api/TaxReceipt - Obteniendo todos los comprobantes...');

    return this.http.get<TaxReceipt[]>(this.API_URL).pipe(
      retry(2),
      tap(receipts => {
        this.logger.log(`✓ ${receipts.length} comprobantes obtenidos`);
      }),
      catchError(this.errorHandler.handleError.bind(this.errorHandler))
    );
  }

  create(receipt: TaxReceiptList): Observable<TaxReceiptList> {
    const payload = {
      RncCedula: receipt.rncCedula,
      Ncf: receipt.NCF,
      Amount: receipt.Amount
    };
    this.logger.log('POST /api/TaxReceipt - Creando comprobante...', payload);

    return this.http.post<TaxReceiptList>(this.API_URL, receipt).pipe(
      tap(newReceipt => {
        this.logger.log('✓ Comprobante creado:', newReceipt);
      }),
      catchError(this.errorHandler.handleError.bind(this.errorHandler))
    );
  }


  getTaxpayerReport(rncCedula: string, taxpayerName?: string): Observable<TaxpayerReport> {
    const url = `${this.API_URL}/taxpayer/${rncCedula}`;
    this.logger.log(`GET /api/TaxReceipt/taxpayer/${rncCedula}`);

    return this.http.get<any[]>(url).pipe(
      retry(2),
      map(receipts => {
        console.log('📦 Datos crudos del backend:', receipts);
        return this.transformToReport(rncCedula, receipts, taxpayerName);
      }),
      tap(report => {
        this.logger.log(
          `\n   Reporte generado para: ${report.Name}`,
          `\n  - Comprobantes: ${report.vouchers.length}`,
          `\n  - Total ITBIS: $${report.TotalItbis.toFixed(2)}`
        );

      }),
      catchError(this.errorHandler.handleError.bind(this.errorHandler))
    );
  }


  private transformToReport(
    rncCedula: string,
    receipts: any[],
    taxpayerName?: string
  ): TaxpayerReport {

    if (!Array.isArray(receipts)) {

      receipts = [];
    }


    const vouchers: TaxReceipt[] = receipts.map(r => {


      const ncf = r.ncf || r.NCF || r.Ncf || '';


      const amountStr = r.amount || r.Amount || '0';


      const itbisStr = r.itbis18 || r.Itbis18 || r.itbis || r.Itbis || '0';


      const amount = this.parseAmount(amountStr);
      const itbis = this.parseAmount(itbisStr);



      return {

        NCF: ncf,
        Amount: amount,
        Itbis: itbis
      };
    });


    const totalItbis = vouchers.reduce((sum, v) => sum + v.Itbis, 0);


    return {
      rncCedula: rncCedula,
      Name: taxpayerName || 'Contribuyente',
      TotalItbis: totalItbis,
      vouchers: vouchers
    };
  }


  private parseAmount(amount: string | number): number {
    if (!amount && amount !== 0) return 0;


    if (typeof amount === 'number') {
      return amount;
    }


    const amountStr = String(amount).trim();

    if (amountStr === '' || amountStr === '0') return 0;


    const hasCommaDecimal = amountStr.includes(',');

    let cleaned: string;

    if (hasCommaDecimal) {

      cleaned = amountStr.replace(/\./g, '').replace(',', '.');
    } else {

      cleaned = amountStr.replace(/,/g, '');
    }

    const result = parseFloat(cleaned);

    if (isNaN(result)) {

      return 0;
    }

    return result;
  }
}