import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DateFormatPipe } from '../core/pipes/date-format.pipe';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
@Component({
  selector: 'app-emitir-concepto-dialog',
  templateUrl: './emitir-concepto-dialog.component.html',
  providers: [MessageService, ToastModule],
  standalone: true,
  imports: [
    CommonModule,
    ToastModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    ButtonModule,
    InputTextModule,
    CalendarModule,
    TimeFormatPipe,
    DateFormatPipe,
  ]
})
export class EmitirConceptoDialogComponent implements OnInit {
  private messageService = inject(MessageService);

  loadingSend: boolean = false;
  loadingData: boolean = false;

  dataTransferred?: any;

  currentObservation?: string;

  formGroup = new FormGroup({
    observationControl: new FormControl<string | null | undefined>(null, [
      Validators.required,
      Validators.maxLength(1000),
    ]),
  });

  constructor(
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef
  ) {
    this.dataTransferred = this.config.data;
  }

  ngOnInit(): void {
    this.formGroup.controls.observationControl.setValue(
      this.dataTransferred?.observacion
    );
    this.currentObservation = this.dataTransferred?.observacion;
  }

  submitForm() {
    if (this.formGroup.invalid) {
      this.messageService.add({ severity: 'warn', summary: 'Atención', detail: 'El formulario no es válido' });
      return;
    }

    if(this.formGroup.controls.observationControl.value?.length! < 5){
      // this.toastService.showWarn('La observación debe tener como mínimo 5 caracteres');
      return;
    }

    this.loadingSend = true;

    let objectSend: any = {
      observacion: this.formGroup.controls.observationControl.value!,
    }
    
    // this.mainService.OrdenamientosService.modificarObservacionOrden(objectSend).subscribe({
    //   next: (req: ResponseData<any>) => {
    //     this.ref.close(true);
    //   },
    //   error: (err: ErrorData) => {
    //     this.loadingSend = false;
    //     this.toastService.showError('Error al guardar', err.mensaje!);
    //   },
    //   complete: () => {
    //     this.loadingSend = false;
    //   },
    // });
  }

  observationIsEqual(): boolean {
    if(this.currentObservation == this.formGroup.controls.observationControl.value) return true;
    return false;
  }
}
