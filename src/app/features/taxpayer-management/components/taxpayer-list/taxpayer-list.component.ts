import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Taxpayer } from '../../../../core/models';

@Component({
  selector: 'app-taxpayer-list',
  templateUrl: './taxpayer-list.component.html',
  styleUrls: ['./taxpayer-list.component.scss']
})
export class TaxpayerListComponent {
  @Input() taxpayers: Taxpayer[] = [];
  @Output() taxpayerSelected = new EventEmitter<string>();

  onSelectTaxpayer(rncCedula: string): void {
    this.taxpayerSelected.emit(rncCedula);
  }
}