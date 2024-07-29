import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { GestionAspiranteService } from '../../../core/services/gestion-aspirante.service';
import { MainComponent } from '../../main.component';
import { Mensajes } from '../../../core/models/mensajes';
import { DocumentoPaciente } from '../../../core/models/documento-paciente';
import { AuthService } from '../../../core/services/auth.service';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-carge-adjuntos',
  standalone: true,
  imports: [CommonModule,ButtonModule,FileUploadModule,ImageModule],
  templateUrl: './carge-adjuntos.component.html',
  styleUrls: ['./carge-adjuntos.component.css'],
  providers: [DialogService]
})
export class CargeAdjuntosComponent {

  @ViewChild('videoElement', { static: false }) videoElement: ElementRef = new ElementRef('');
  @ViewChild('canvasElement', { static: false }) canvasElement: ElementRef = new ElementRef('');
  @ViewChild('fotoImg', { static: false }) fotoImg: ElementRef = new ElementRef('');;
  @ViewChild('firmaImg', { static: false }) firmaImg: ElementRef = new ElementRef('');

  ref: DynamicDialogRef =  new DynamicDialogRef();
  mensaje: Mensajes = { detail: '', severity: '', summary: '' };

  //Toma de Foto
  swTomarFoto = false;
  foto: string | null = null;

  //captura de la firma
  firmaBase64: string | null = null;
  firmapdfFile: File | null = null;

  constructor(public dialogService: DialogService,public gestionAspiranteService: GestionAspiranteService,public padre: MainComponent,public _authService: AuthService) {}

  activarCamara() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        this.swTomarFoto = true;
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.videoElement.nativeElement.srcObject = stream;
      }).catch(error => {
        console.error('Error al acceder a la cámara: ', error);
      });
    } else {
      console.error('La API de getUserMedia no es compatible con este navegador.');
    }
  }

  capturarFoto() {
    const canvas = this.canvasElement.nativeElement;
    const video = this.videoElement.nativeElement;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    this.foto = canvas.toDataURL('image/png');
    this.swTomarFoto = false;
    const stream = video.srcObject as MediaStream;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    video.srcObject = null;

    const body: DocumentoPaciente = {
      pacienteId: 10319227,
      tipoArchivo: 'FOTO',
      archivoBase64: this.foto || '',
      usuarioRegistroId: this._authService.usuarioId,
      registroIp: ''
    };

    this.gestionAspiranteService.saveDocumentosAspirante(body).subscribe({
      next: (req: any) => {
        if (req.isSuccess) {
          this.mensaje = {severity:'success', summary: 'Success', detail: 'Foto guardada correctamente'};
        }else {
          this.mensaje = {severity:'error', summary: 'Error', detail: req.message};
        }
      },
      error: (err: any) => {
        this.mensaje = {severity:'error', summary: 'Error', detail: err.error.message};
      },
      complete: () => {
        this.padre.mensaje.next(this.mensaje);
      }
    });
  }

  async onUploadFirma(event: any) {
    const file = event.files[0]; // Asumiendo que solo se sube un archivo
    if (file.type.startsWith('image/')){
      this.firmaBase64 = await this.convertFileToBase64(file);
      this.firmaBase64 = 'data:image/png;base64,' + this.firmaBase64;

      const body: DocumentoPaciente = {
        pacienteId: 10319227,
        tipoArchivo: 'FIRMA',
        archivoBase64: this.firmaBase64 || '',
        usuarioRegistroId: this._authService.usuarioId,
        registroIp: ''
      };

      this.gestionAspiranteService.saveDocumentosAspirante(body).subscribe({
        next: (req: any) => {
          if (req.isSuccess) {
            this.mensaje = {severity:'success', summary: 'Success', detail: 'Firma guardada correctamente'};
          }else {
            this.mensaje = {severity:'error', summary: 'Error', detail: req.message};
          }
        },
        error: (err: any) => {
          this.mensaje = {severity:'error', summary: 'Error', detail: err.error.message};
        },
        complete: () => {
          this.padre.mensaje.next(this.mensaje);
        }
      });
    }
    else {
      this.mensaje = {severity:'error', summary: 'Error', detail: 'Firma no pudo ser guardada, formato no válido'};
      this.padre.mensaje.next(this.mensaje);
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve((reader.result as string).split(',')[1]); // Obtén la cadena Base64
      };
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  mostrarImagenes(imagen: string) {
    if (imagen === 'fotoImg') {
      this.ocultarImagenDiv('all');
      const divImg = this.fotoImg.nativeElement;
      divImg.style.display = 'block';
    }

    if (imagen === 'firmaImg') {
      this.ocultarImagenDiv('all');
      const firmaImg = this.firmaImg.nativeElement;
      firmaImg.style.display = 'block';
    }

  }

  ocultarImagenDiv(imagen: string){
    if (imagen === 'fotoImg') {
      const divImg = this.fotoImg.nativeElement;
      divImg.style.display = 'none';
    } else if (imagen === 'firmaImg') {
      const firmaImg = this.firmaImg.nativeElement;
      firmaImg.style.display = 'none';
    }
    else {
      const divImg = this.fotoImg.nativeElement;
      divImg.style.display = 'none';
      const firmaImg = this.firmaImg.nativeElement;
      firmaImg.style.display = 'none';
    }
  }
}
