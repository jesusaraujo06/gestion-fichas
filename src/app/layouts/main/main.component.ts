import { CommonModule, DatePipe } from '@angular/common';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [CommonModule, RouterOutlet, DatePipe],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'es-CO'
    },
    DatePipe,
  ]
})
export class MainComponent {
  fecha!: Date;
  loading: boolean = false;

  constructor(
    public _authService: AuthService,
  ) {
    this.fecha = new Date();
  }

  ngOnInit(): void {
    this._authService.getUserData().subscribe({
      next: (req:any) => {
        this._authService.datosUsuario = req;
        this._authService.usuarioId = this._authService.datosUsuario.id;
        this._authService.getPermisosUsuario().subscribe({
          next: (req: any) => {
            if(req.isSuccess){
              this._authService.datosUsuario.perfiles = req.data;
            }
          },
          error: (err: any) => {
            this.loading = false;
          },
          complete: () => {
            this.loading = false;
          }
        });
        this.loading = false;
      },
      error: (err: any) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

}
