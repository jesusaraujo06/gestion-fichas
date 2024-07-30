import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { UploadManualFileRequest } from '../../../core/models/upload-manual-file';
import { AuthService } from '../../../core/services/auth.service';
import { GestionAspiranteService } from '../../../core/services/gestion-aspirante.service';
import { TipoFicha } from '../../../core/models/tipo_ficha';
import { Mensajes } from '../../../core/models/mensajes';
import { MainComponent } from '../../main.component';

@Component({
  selector: 'app-carge-formularios',
  standalone: true,
  imports: [CommonModule, FileUploadModule, FormsModule, ReactiveFormsModule],
  templateUrl: './carge-formularios.component.html',
  styleUrls: ['./carge-formularios.component.css'],
  providers: [DialogService, MessageService]
})
export class CargeFormulariosComponent {

  ref: DynamicDialogRef = new DynamicDialogRef();
  tipoFicha: TipoFicha = new TipoFicha();
  uploadedFiles: UploadManualFileRequest = new UploadManualFileRequest();
  files: any[] = [];
  mensaje: Mensajes = { detail: '', severity: '', summary: '' };

  constructor(public dialogService: DialogService, public _configDialog: DynamicDialogConfig, private messageService: MessageService
    , public _authService: AuthService, public gestionAspirante: GestionAspiranteService,public padre: MainComponent) {
    this.tipoFicha = this._configDialog.data;
  }

  onUpload(event:any) {

    if (event.files.length <= 0) {
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: '' });
    }
    else {

        const formData = new FormData();
        for (let file of event.files) {
          this.files.push(file);
          formData.append('files', file);
        }

        this.uploadedFiles.tipofichaId = this.tipoFicha.id;
        this.uploadedFiles.usuarioCreacionId = this._authService.datosUsuario.id;
        this.uploadedFiles.pacienteId = this.gestionAspirante.aspirante.pacienteId;

        formData.append('uploadedFiles', JSON.stringify(this.uploadedFiles))

        this.gestionAspirante.uploadFilesFicha(formData).subscribe({
          next: (req: any) => {
            if(req.isSuccess) {
              this.mensaje = {severity: 'success', summary: 'Success', detail: req.message};
            }
            else{
              this.mensaje = {severity: 'error', summary: 'Error', detail: req.message};
            }
          },
          error: (err: any) => {
            this.mensaje = {severity: 'error', summary: 'Error', detail: err.error.message} ;
          },
          complete: () => {
            this.padre.mensaje.next(this.mensaje);
          }
        });


    }
  }
}
