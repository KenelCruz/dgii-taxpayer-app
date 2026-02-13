import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaxReceiptService } from '../../../../core/services/tax-receipt.service';
import { TaxReceipt, TaxReceiptList } from '../../../../core/models';

export interface CreateReceiptDialogData {
  rncCedula: string;
  taxpayerName: string;
}

@Component({
  selector: 'app-create-receipt-dialog-component',

  templateUrl: './create-receipt-dialog-component.component.html',
  styleUrl: './create-receipt-dialog-component.component.scss'
})
export class CreateReceiptDialogComponent implements OnInit {receiptForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private taxReceiptService: TaxReceiptService,
    public dialogRef: MatDialogRef<CreateReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateReceiptDialogData
  ) {
    this.receiptForm = this.fb.group({
      rncCedula: [{ value: data.rncCedula, disabled: true }, Validators.required],
      NCF: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(19),
        Validators.pattern(/^[A-Z][0-9]+$/)  
      ]],
      Amount: ['', [
        Validators.required,
        Validators.min(0.01),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]],
      Itbis: ['', [
        Validators.required,
        Validators.min(0),
        Validators.pattern(/^\d+(\.\d{1,2})?$/)
      ]]
    });
  }

  ngOnInit(): void {
    console.log('📝 Diálogo de creación abierto para:', this.data);
  }


  calculateItbis(): void {
    const amount = this.receiptForm.get('Amount')?.value;
    if (amount && !isNaN(amount)) {
      const itbis = (parseFloat(amount) * 0.18).toFixed(2);
      this.receiptForm.patchValue({ Itbis: itbis });
    }
  }


  onSubmit(): void {
    if (this.receiptForm.invalid) {
      this.markFormGroupTouched(this.receiptForm);
      return;
    }

    this.loading = true;
    this.error = null;


    const receipt: TaxReceiptList = {
      NCF: this.receiptForm.get('NCF')?.value.toUpperCase(),
      rncCedula: this.receiptForm.get('rncCedula')?.value.toUpperCase(),
      Amount: this.receiptForm.get('Amount')?.value,
      Itbis18: this.receiptForm.get('Itbis')?.value
    };



    this.taxReceiptService.create(receipt).subscribe({
      next: (newReceipt) => {

        this.dialogRef.close(newReceipt);
      },
      error: (err) => {

        this.error = err.message || 'Error al crear el comprobante. Por favor, intenta nuevamente.';
        this.loading = false;
      }
    });
  }


  onCancel(): void {
    this.dialogRef.close();
  }


  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }


  getErrorMessage(fieldName: string): string {
    const field = this.receiptForm.get(fieldName);
    if (!field || !field.touched || !field.errors) {
      return '';
    }

    if (field.errors['required']) {
      return 'Este campo es requerido';
    }
    if (field.errors['minlength']) {
      return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    if (field.errors['maxlength']) {
      return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    }
    if (field.errors['pattern']) {
      if (fieldName === 'NCF') {
        return 'Formato inválido. Debe comenzar con una letra seguida de números (ej: B0100000001)';
      }
      return 'Formato inválido. Use números con hasta 2 decimales (ej: 1000.50)';
    }
    if (field.errors['min']) {
      return `El valor mínimo es ${field.errors['min'].min}`;
    }

    return 'Campo inválido';
  }

  hasError(fieldName: string): boolean {
    const field = this.receiptForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }
}
