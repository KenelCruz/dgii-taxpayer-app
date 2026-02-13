import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  log(message: string, ...optionalParams: any[]): void {
    console.log(message, ...optionalParams);
  }

  logError(message: string, error?: any): void {
    console.error(message, error);
  }

  logWarning(message: string, ...optionalParams: any[]): void {
    console.warn(message, ...optionalParams);
  }

  logInfo(message: string, ...optionalParams: any[]): void {
    console.info(message, ...optionalParams);
  }

  logDebug(message: string, ...optionalParams: any[]): void {
    console.debug(message, ...optionalParams);
  }
}