import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';
import { APIs } from '../constant/api';
import { ApiService } from './api.service';

export class Token {
  id: number = 0;
  inicio_Sesion: string = "";
  documento: string= "";
  nombres: string= "";
  apellidos: string= "";
  telefono: string= "";
  perfil: string= "";
  correo_Electronico: string= "";
  es_Eliminado: boolean= false;
  perfiles: Array<any> = [];
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public datosUsuario: Token = new Token;

  constructor(
    private cookieService: CookieService,
    private _apiService: ApiService
  ) { }

  public getUserData() {
    let params = new HttpParams();
    params = params.set("login", this.getToken());

    return this._apiService.get<any>(APIs.medico.getLogin, false, params);
  }

  getToken() {
    return this.cookieService.get('UsuarioMedico');
  }
}
