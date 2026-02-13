import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxpayerManagementRoutingModule } from './taxpayer-management-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ReceiptTableComponent } from './components/receipt-table/receipt-table.component';
import { TaxpayerDetailComponent } from './components/taxpayer-detail/taxpayer-detail.component';
import { TaxpayerListComponent } from './components/taxpayer-list/taxpayer-list.component';
import { TaxpayerDashboardComponent } from './pages/taxpayer-dashboard/taxpayer-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CreateReceiptDialogComponent } from './components/create-receipt-dialog-component/create-receipt-dialog-component.component';

@NgModule({
  declarations: [
    TaxpayerDashboardComponent,
    TaxpayerListComponent,
    TaxpayerDetailComponent,
    ReceiptTableComponent,
    CreateReceiptDialogComponent
  ],
  imports: [
    CommonModule,
    TaxpayerManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class TaxpayerManagementModule { }
