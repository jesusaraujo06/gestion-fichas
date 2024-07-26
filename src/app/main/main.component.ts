import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { comboModel } from '../core/models/combo';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CardModule, ToastModule, DropdownModule, ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [MessageService]
})
export class MainComponent {
  isLoadingSearch: boolean = false;

  comboTipoDocumento: comboModel[] = [];

  form_search = new FormGroup({
    tipo_documento: new FormControl<string | null>(null),
    numero_documento: new FormControl<string | null>(null),
    id: new FormControl<number | null>(null),
    sede: new FormControl<string | null>(null),
  })


  getUser(){

  }

}
