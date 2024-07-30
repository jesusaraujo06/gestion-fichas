import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { HttpParams } from '@angular/common/http';
import { APIs } from '../constant/api';
import { ApiService } from './api.service';
import { PermisoUsuario } from '../models/permiso-usuario';

export class Token {
    id: number = 0;
    inicio_Sesion: string = "";
    documento: string = "";
    nombres: string = "";
    apellidos: string = "";
    telefono: string = "";
    perfil: string = "";
    correo_Electronico: string = "";
    es_Eliminado: boolean = false;
    perfiles: Array<PermisoUsuario> = [];
}


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public datosUsuario: Token = new Token;
    public ProfesionalId:  number = 0;

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

    getPermisosUsuario() {
        let params = new HttpParams();
        params = params.set("Usuario_Id", this.datosUsuario.id);
        return this._apiService.get<Array<PermisoUsuario>>(APIs.usuario.usuarioPermiso, false, params);
    }

    getEspecialidadMedico() {
        let params = new HttpParams();
        params = params.set("login", this.getToken());
        return this._apiService.get<any>(APIs.medico.getObtemerEspecialidad, false, params);
    }

    isPermiso(permiso: string): boolean {
        const permisos = this.datosUsuario.perfiles.find(x =>x.permiso == permiso);
        return permisos != undefined;
    }

    getProfesionalId() {
        let params = new HttpParams();
        params = params.set("UsuarioId", this.datosUsuario.id);
        return this._apiService.get<any>(APIs.medico.getProfesionalId, false, params);

    }

}
