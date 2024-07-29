import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { comboModel } from '../core/models/combo';
import { CalendarModule } from 'primeng/calendar';
import { AuthService } from '../core/services/auth.service';

@Component({
    selector: 'app-cita-dia',
    standalone: true,
    imports: [CommonModule, ToastModule, CardModule,FormsModule, ReactiveFormsModule,DropdownModule,ButtonModule,InputTextModule,CalendarModule],
    templateUrl: './cita-dia.component.html',
    styleUrls: ['./cita-dia.component.css'],
    providers: [MessageService]
})
export class CitaDiaComponent implements OnInit {

    isLoadingSearch: boolean = false;
    comboEspecialidades: any[] = [];
    comboEstado: comboModel[] = [];

    form_search = new FormGroup({
        especialidades: new FormControl<string | null>(null),
        fecha: new FormControl<Date | null>(null),
        estados: new FormControl<string | null>(null)
      })

    constructor(public messageService: MessageService, public _authService: AuthService) { }

    ngOnInit(): void {

      this._authService.getEspecialidadMedico().subscribe({
        next: (req: any) => {
          this.comboEspecialidades = req;
        },
        error: (err: any) => {
        },
        complete: () => {
        }
      });

      this.comboEstado.push({ descripcion: 'Pendientes', valor: 'ACT', id: 1 });
      this.comboEstado.push({ descripcion: 'Activo', valor: 'FAC' , id: 2});
      this.comboEstado.push({ descripcion: 'Procesadas', valor: 'PRO', id: 3 });
      this.comboEstado.push({ descripcion: 'Todos', valor: '', id: 4 });
    }

}
