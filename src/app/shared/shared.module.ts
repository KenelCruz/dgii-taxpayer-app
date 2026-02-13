import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './components/error-message/error-message.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { MaterialModule } from './material.module';
import { CurrencyDopPipe } from './pipes/currency-dop.pipe';



@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    CurrencyDopPipe
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    CurrencyDopPipe
  ]
})
export class SharedModule { }
