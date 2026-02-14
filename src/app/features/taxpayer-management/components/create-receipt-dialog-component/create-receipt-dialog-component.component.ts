import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

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
export class CreateReceiptDialogComponent implements OnInit {

  receiptForm: FormGroup;
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
    console.log('📋 Diálogo de creación abierto para:', this.data);
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
      NCF:       this.receiptForm.get('NCF')?.value.toUpperCase(),
      rncCedula: this.data.rncCedula,
      Amount:    this.receiptForm.get('Amount')?.value,
      Itbis18:  this.receiptForm.get('Itbis')?.value
    };

    console.log('📤 Enviando comprobante:', receipt);

    this.taxReceiptService.create(receipt).subscribe({
      next: (newReceipt) => {
        console.log('✅ Comprobante creado:', newReceipt);
        this.loading = false;

        // 1. Cierra el diálogo primero pasando el resultado
        this.dialogRef.close(newReceipt);

        // 2. Muestra el SweetAlert de éxito
        Swal.fire({
          icon: 'success',
          title: '¡Comprobante creado!',
          html: `
            <div style="text-align:left; font-size:0.9rem; line-height:1.7">
              <p style="margin:0 0 6px"><b>NCF:</b> ${receipt.NCF}</p>
              <p style="margin:0 0 6px"><b>Monto:</b> RD$ ${Number(receipt.Amount).toFixed(2)}</p>
              <p style="margin:0"><b>ITBIS (18%):</b> RD$ ${Number(receipt.Itbis18).toFixed(2)}</p>
            </div>
          `,
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#1a56db',
          timer: 4000,
          timerProgressBar: true,
          showClass: {
            popup: 'animate__animated animate__fadeInDown animate__faster'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp animate__faster'
          }
        }).then(() => {
          // 3. Recarga la página al cerrar/aceptar el alert
          window.location.reload();
        });
      },

      error: (err) => {
        console.error('❌ Error al crear comprobante:', err);

        this.loading = false;
        this.error = err.message || 'Error al crear el comprobante. Por favor, intenta nuevamente.';

        // Alerta de error también con SweetAlert
        Swal.fire({
          icon: 'error',
          title: 'Error al crear el comprobante',
          text: this.error ?? 'Ocurrió un error inesperado.',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#dc2626'
        });
      }
    });
  }

  // ──────────────────────────────────────────────────────────
  onCancel(): void {
    this.dialogRef.close();
  }

  // ──────────────────────────────────────────────────────────
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  // ──────────────────────────────────────────────────────────
  getErrorMessage(fieldName: string): string {
    const field = this.receiptForm.get(fieldName);
    if (!field?.touched || !field.errors) return '';

    if (field.errors['required'])   return 'Este campo es requerido';
    if (field.errors['minlength'])  return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['maxlength'])  return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['min'])        return `El valor mínimo es ${field.errors['min'].min}`;
    if (field.errors['pattern']) {
      return fieldName === 'NCF'
        ? 'Debe comenzar con una letra seguida de números (ej: B0100000001)'
        : 'Use números con hasta 2 decimales (ej: 1000.50)';
    }

    return 'Campo inválido';
  }

  hasError(fieldName: string): boolean {
    const field = this.receiptForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }
}