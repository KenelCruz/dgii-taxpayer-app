# Sistema de Gestión de Contribuyentes - DGII

Sistema web para la gestión de contribuyentes y comprobantes fiscales desarrollado para la Dirección General de Impuestos Internos (DGII) de República Dominicana.

---

## 📝 Descripción

Aplicación frontend que permite:
- **Visualizar** lista de contribuyentes registrados (personas físicas y jurídicas)
- **Consultar** detalles de cada contribuyente
- **Ver** comprobantes fiscales (NCF) asociados a cada contribuyente
- **Crear** nuevos comprobantes con validaciones automáticas
- **Calcular** automáticamente el ITBIS (18% del monto)
- **Totalizar** impuestos por contribuyente

---

## 🛠️ Tecnologías

### Frontend
- **Angular 17** - Framework principal
- **TypeScript 5.0** - Lenguaje
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva
- **SCSS** - Estilos

### Backend (API)
- **ASP.NET Core Web API** - REST API
- **Entity Framework Core** - ORM
- **SQL Server** - Base de datos

---

## 📋 Requisitos Previos

```bash
Node.js >= 18.x
npm >= 9.x
Angular CLI >= 17.x
```

### Instalar Angular CLI
```bash
npm install -g @angular/cli
```

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/dgii-taxpayer-management.git
cd dgii-taxpayer-management
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crea el archivo `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'  // URL de tu backend
};
```

---

## ▶️ Ejecutar la Aplicación

### Modo Desarrollo
```bash
ng serve
```

Abre el navegador en: `http://localhost:4200`

### Con Puerto Específico
```bash
ng serve --port 4300
```

### Abrir Navegador Automáticamente
```bash
ng serve --open
```

---

## 🏗️ Build para Producción

```bash
ng build --configuration production
```

Los archivos compilados estarán en `dist/`

---

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                          # Servicios y modelos core
│   │   ├── models/                    # Interfaces y modelos
│   │   │   ├── taxpayer.model.ts
│   │   │   ├── tax-receipt.model.ts
│   │   │   └── taxpayer-report.model.ts
│   │   └── services/                  # Servicios HTTP
│   │       ├── taxpayer.service.ts
│   │       └── tax-receipt.service.ts
│   │
│   └── features/
│       └── taxpayer-management/       # Módulo principal
│           ├── components/
│           │   ├── taxpayer-dashboard/        # Vista principal
│           │   ├── taxpayer-list/             # Lista de contribuyentes
│           │   ├── taxpayer-detail/           # Detalle del contribuyente
│           │   ├── receipt-table/             # Tabla de comprobantes
│           │   └── create-receipt-dialog/     # Modal crear comprobante
│           │
│           └── taxpayer-management.module.ts  # Módulo feature
│
└── environments/                      # Configuración de entornos
    ├── environment.ts                 # Producción
    └── environment.development.ts     # Desarrollo
```

---

## 🔌 Endpoints API

El frontend consume los siguientes endpoints:

### Contribuyentes
```http
GET  /api/Taxpayer              # Listar todos
GET  /api/Taxpayer/{documento}  # Obtener por RNC/Cédula
```

### Comprobantes Fiscales
```http
GET  /api/TaxReceipt                        # Listar todos
GET  /api/TaxReceipt/taxpayer/{rncCedula}  # Por contribuyente
POST /api/TaxReceipt                        # Crear nuevo
```

### Ejemplo de Request (Crear Comprobante)
```json
POST /api/TaxReceipt
Content-Type: application/json

{
  "NCF": "B0100000001",
  "Amount": 1000.00,
  "Itbis": 180.00
}
```

---

## 🎯 Funcionalidades Principales

### 1. Dashboard de Contribuyentes
- Lista en formato de tarjetas
- Información: RNC, Nombre, Tipo, Estado
- Click para ver detalles

### 2. Detalle de Contribuyente
- Información completa del contribuyente
- Tabla de comprobantes fiscales asociados
- Total de ITBIS acumulado
- Botón para crear nuevo comprobante

### 3. Crear Comprobante Fiscal
- Modal con formulario reactivo
- Validaciones en tiempo real:
  - **NCF**: Letra + números (11-19 caracteres)
  - **Monto**: Positivo, máximo 2 decimales
  - **ITBIS**: Calculado automáticamente al 18%
- Cálculo automático de ITBIS al salir del campo monto
- Botón para recalcular manualmente
- Conversión automática de NCF a mayúsculas

---

## 📊 Modelos de Datos

### Taxpayer (Contribuyente)
```typescript
interface Taxpayer {
  rncCedula: string;      // RNC o Cédula
  nombre: string;         // Nombre completo
  tipo: string;          // "PERSONA FISICA" | "PERSONA JURIDICA"
  estatus: string;       // "activo" | "inactivo"
}
```

### TaxReceipt (Comprobante)
```typescript
interface TaxReceipt {
  NCF: string;      // Número de Comprobante Fiscal
  Amount: number;   // Monto total
  Itbis: number;    // ITBIS (18%)
}
```

### TaxpayerReport (Reporte)
```typescript
interface TaxpayerReport {
  rncCedula: string;
  Name: string;
  TotalItbis: number;
  vouchers: TaxReceipt[];  // Lista de comprobantes
}
```

---

## ⚙️ Configuración Importante

### Importar Módulos de Angular Material

En `taxpayer-management.module.ts`:

```typescript
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,      // Para formularios
    MatDialogModule,          // Para modales
    MatFormFieldModule,       // Para campos de formulario
    MatInputModule,           // Para inputs
    MatButtonModule,          // Para botones
    MatIconModule,            // Para iconos
    MatProgressSpinnerModule  // Para loading
  ]
})
```

---

## 🧪 Testing

### Tests Unitarios
```bash
ng test
```

### Tests con Coverage
```bash
ng test --code-coverage
```

### Tests E2E
```bash
ng e2e
```

---

## 🔧 Solución de Problemas Comunes

### Error: "mat-xxx is not a known element"
**Solución:** Importar los módulos de Material en el módulo feature
```typescript
import { MatDialogModule } from '@angular/material/dialog';
// ... otros módulos
```

### Error: "Cannot find module '@angular/material'"
**Solución:** Instalar Angular Material
```bash
ng add @angular/material
```

### La tabla no muestra datos
**Solución:** Verificar en consola del navegador (F12) los logs:
- ✅ Debe ver: "Datos crudos del backend"
- ✅ Debe ver: "Receipts recibidos en tabla"

### Backend no responde
**Solución:** Verificar que el backend esté corriendo y la URL en `environment.ts` sea correcta

---

## 🎨 Personalización

### Cambiar el porcentaje de ITBIS

En `create-receipt-dialog.component.ts`:
```typescript
calculateItbis(): void {
  const amount = this.receiptForm.get('Amount')?.value;
  if (amount && !isNaN(amount)) {
    const itbis = (parseFloat(amount) * 0.20).toFixed(2);  // 20% en vez de 18%
    this.receiptForm.patchValue({ Itbis: itbis });
  }
}
```

### Cambiar el tema de colores

En `styles.scss`:
```scss
@use '@angular/material' as mat;

$primary: mat.define-palette(mat.$blue-palette);
$accent: mat.define-palette(mat.$pink-palette);
```


## 👨‍💻 Autor

**Kenel Cruz**
- GitHub: [@KenelCruz](https://github.com/tu-usuario)
- Email: tu-email@example.com

---



<div align="center">

**Desarrollado para la DGII - República Dominicana 🇩🇴**

</div>
