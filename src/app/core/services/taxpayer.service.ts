import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, retry, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Taxpayer } from '../models';
import { ErrorHandlerService } from './error-handler.service';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class TaxpayerService {
  private readonly API_URL = `${environment.apiUrl}/api/Taxpayer`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private logger: LoggerService
  ) { }

 
  getAll(): Observable<Taxpayer[]> {
    this.logger.log('GET /api/Taxpayer - Obteniendo lista de contribuyentes...');

    return this.http.get<Taxpayer[]>(this.API_URL).pipe(
      retry(2),
      tap(taxpayers => {
        this.logger.log(`✓ ${taxpayers.length} contribuyentes obtenidos`);
      }),
      catchError(this.errorHandler.handleError.bind(this.errorHandler))
    );
  }


  getByDocument(document: string): Observable<Taxpayer> {
    const url = `${this.API_URL}/${document}`;
    this.logger.log(`GET /api/Taxpayer/${document}`);

    return this.http.get<Taxpayer>(url).pipe(
      retry(2),
      tap(taxpayer => {
        this.logger.log(`✓ Contribuyente obtenido:`, taxpayer);
      }),
      catchError(this.errorHandler.handleError.bind(this.errorHandler))
    );
  }
}