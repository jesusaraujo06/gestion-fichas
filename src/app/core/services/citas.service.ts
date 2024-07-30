import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { APIs } from '../constant/api';
import { GetCitasDiaMedicoVivaAndLaboralRequest } from '../models/citas-request';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  citaRequest: GetCitasDiaMedicoVivaAndLaboralRequest = new GetCitasDiaMedicoVivaAndLaboralRequest();
  citas: Cita[] = [];

  constructor(private _apiService: ApiService) { }

  getCitasDiaMedico() {
    return this._apiService.post<GetCitasDiaMedicoVivaAndLaboralRequest,any>(APIs.medico.getCitasDiasMedico, this.citaRequest);
  }
}
