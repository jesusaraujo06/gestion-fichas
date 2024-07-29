import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-carge-formularios',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './carge-formularios.component.html',
  styleUrls: ['./carge-formularios.component.css'],
  providers: [DialogService,MessageService]
})
export class CargeFormulariosComponent {

  uploadedFiles: any[] = [];
  ref: DynamicDialogRef =  new DynamicDialogRef();
  especialidad: string | undefined;

  constructor(public dialogService: DialogService, public _configDialog: DynamicDialogConfig,private messageService: MessageService) {
      this.especialidad = this._configDialog.data.especialdad;
  }

  onUpload(event:any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }

    if (this.uploadedFiles.length > 0) {
      this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Error', detail: 'No se ha cargado ningun archivo'});
    }
  }

}
