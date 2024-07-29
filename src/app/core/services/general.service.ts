import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { APIs } from '../constant/api';
import { TipoDocumento } from '../models/tipo-documento';

@Injectable({
    providedIn: 'root'
})
export class GeneralService {

    constructor(private cookieService: CookieService,private _apiService: ApiService) { }

    getTipoDocumentos() {
        return this._apiService.get<TipoDocumento>(APIs.combo.getParTipoDocumento, false);
    }
}
