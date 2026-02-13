import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private logger: LoggerService) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {

      errorMessage = `Error: ${error.error.message}`;
      this.logger.logError('Error del cliente:', error.error);
    } else {
      
      errorMessage = this.getServerErrorMessage(error);
      this.logger.logError(
        `Error del servidor. Código: ${error.status}`,
        error
      );
    }

    return throwError(() => new Error(errorMessage));
  }

  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
      case 400:
        return 'Solicitud incorrecta. Verifique los datos enviados.';
      case 401:
        return 'No autorizado. Por favor inicie sesión.';
      case 403:
        return 'Acceso prohibido. No tiene permisos.';
      case 404:
        return 'Recurso no encontrado.';
      case 500:
        return 'Error interno del servidor. Intente más tarde.';
      case 503:
        return 'Servicio no disponible. Intente más tarde.';
      default:
        return error.message || 'Error en la comunicación con el servidor.';
    }
  }
}