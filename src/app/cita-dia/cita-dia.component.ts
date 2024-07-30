import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { comboModel } from '../core/models/combo';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../core/services/auth.service';
import { CitasService } from '../core/services/citas.service';
import { TimeFormatPipe } from '../core/pipes/time-format.pipe';
import { DateFormatPipe } from '../core/pipes/date-format.pipe';

@Component({
  selector: 'app-cita-dia',
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
  ],
  templateUrl: './cita-dia.component.html',
  styleUrls: ['./cita-dia.component.css'],
  providers: [MessageService],
})
export class CitaDiaComponent implements OnInit {
  isLoadingSearch: boolean = false;
  comboEspecialidades: any[] = [];
  comboEstado: comboModel[] = [];

  form_search = new FormGroup({
    especialidades: new FormControl<any>(null),
    fecha: new FormControl<Date>(new Date()),
    estados: new FormControl<string>(''),
  });

  constructor(
    public messageService: MessageService,
    public _authService: AuthService,
    public citasService: CitasService
  ) {}

  ngOnInit(): void {
    this._authService.getEspecialidadMedico().subscribe({
      next: (req: any) => {
        this.comboEspecialidades = req;
        if (this.comboEspecialidades.length > 0) {
          this.form_search.controls.especialidades.setValue(this.comboEspecialidades[0]);
        }
      },
      error: (err: any) => {},
      complete: () => {},
    });

    this.comboEstado.push({ descripcion: 'Pendientes', valor: 'ACT', id: 1 });
    this.comboEstado.push({ descripcion: 'Activo', valor: 'FAC', id: 2 });
    this.comboEstado.push({ descripcion: 'Procesadas', valor: 'PRO', id: 3 });
    this.comboEstado.push({ descripcion: 'Todos', valor: '', id: 4 });
  }

  buscarCitas() {
    // Obtener los valores del formulario
    const especialidades = this.form_search.value.especialidades;
    const fecha = this.form_search.value.fecha;
    const estado = this.form_search.value.estados;

    // Asignar los valores al objeto CitasRequest
    this.citasService.citaRequest.especialidad_Id = especialidades;
    this.citasService.citaRequest.perfil_profesional = this._authService.datosUsuario.perfiles[0].perfilId!;

    if (fecha) {
      this.citasService.citaRequest.fecha = fecha;
    }

    this.citasService.citaRequest.profesional_Id =
      this._authService.ProfesionalId;

    this.citasService.getCitasDiaMedico().subscribe({
      next: (req: any) => {
        if (req.isSuccess) {
          this.citasService.citas = req.data;
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Se encontraron las citas',
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al buscar las citas',
          });
        }
      },
      error: (err: any) => {
        if (err.status == 404) {
          if (err.error.isSuccess) {
            this.messageService.add({
              severity: 'info',
              summary: 'Info',
              detail: 'No se encontraron registros',
            });
          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Ocurrió un error al buscar las citas',
            });
          }
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Ocurrió un error al buscar las citas',
          });
        }
      },
      complete: () => {},
    });
  }

  showEstado(estado: string): string {
    if (estado === 'ACT') {
      return 'Pendiente';
    } else if (estado === 'FAC') {
      return 'Activo';
    } else if (estado === 'PRO') {
      return 'Procesado';
    } else {
      return estado;
    }
  }
}
