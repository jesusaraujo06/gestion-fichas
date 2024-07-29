import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { comboModel } from '../core/models/combo';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CargeAdjuntosComponent } from './modal/carge-adjuntos/carge-adjuntos.component';
import { CargeFormulariosComponent } from './modal/carge-formularios/carge-formularios.component';
import { TableModule } from 'primeng/table';
import { AuthService } from '../core/services/auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GeneralService } from '../core/services/general.service';
import { Mensajes } from '../core/models/mensajes';
import { GestionAspiranteService } from '../core/services/gestion-aspirante.service';
import { Aspirante } from '../core/models/aspirante';
import { SexoCompletoPipe,FechaSimplePipe } from '../core/pipes';


@Component({
	selector: 'app-main',
	standalone: true,
	imports: [
            CommonModule, CardModule, ToastModule, DropdownModule
            ,ButtonModule, InputTextModule, FormsModule, ReactiveFormsModule
            ,AvatarModule, DialogModule, FileUploadModule, TableModule
            ,SexoCompletoPipe,FechaSimplePipe],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css'],
	providers: [MessageService, DialogService]
})
export class MainComponent implements OnInit {

	isLoadingSearch: boolean = false;
	comboTipoDocumento: comboModel[] = [];
	ref: DynamicDialogRef | undefined;
  mensaje = new BehaviorSubject<Mensajes>({ detail: '', severity: '' ,summary: '' });
  suscripcion: Subscription = new Subscription();
  loading: boolean = false;
  swMostrarDatos: boolean = false;

	form_search = new FormGroup({
		tipo_documento: new FormControl<string>('', [Validators.required]),
		numero_documento: new FormControl<string>('', [Validators.required]),
	})

	constructor(public dialogService: DialogService, public authService: AuthService, public messageService: MessageService, public general: GeneralService, public gestionAspirante: GestionAspiranteService) { }

  ngOnInit(): void {
    this.general.getTipoDocumentos().subscribe({
      next: (req: any) => {
        this.comboTipoDocumento = req;
      },
      error: (err: any) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });

		this.suscripcion = this.mensaje.subscribe(mensaje => {
			if (mensaje) {
			  this.messageService.add({severity:mensaje.severity, summary: mensaje.summary, detail: mensaje.detail});
			}
		  });
	}

	showDialogCargarAgjuntosUsuario() {
		this.ref = this.dialogService.open(CargeAdjuntosComponent, {
			header: 'Cargar / Ver adjunto',
			width: '40vw',
		});
	}

	showCargarFormulario(especialdad: string) {
		this.ref = this.dialogService.open(CargeFormulariosComponent, {
			header: `Cargar formulario ${especialdad}`,
			width: '40vw',
			data: { especialdad }
		});
	}

	getUser() {
    if (this.form_search.valid){
      this.loading = true;
      const tipo_documento = this.form_search.value.tipo_documento ?? '';
      const numero_documento = this.form_search.value.numero_documento ?? '';
      this.gestionAspirante.getDatosAspirantebyDocumento(tipo_documento, numero_documento).subscribe({
        next: (req: any) => {
          if(req.isSuccess){
            this.gestionAspirante.aspirante = req.data[0];
            this.swMostrarDatos = true;
          }
        },
        error: (err: any) => {
          this.loading = false;
        },
        complete: () => {
          this.loading = false;
          this.form_search.reset();
        }
      });
    }
    else
    {
      this.mensaje.next({ detail: 'Debe seleccionar un tipo de documento y digitar el número de documento', severity: 'error', summary: 'Error' });
    }
	}


	onUploadTest(event: any) {
		console.log(event);
	}

}
