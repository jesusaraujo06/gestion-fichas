import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BaseResponse } from '../models/base-response';
import { APIs } from '../constant/api';
import { HttpParams } from '@angular/common/http';
import { Aspirante } from '../models/aspirante';
import { DocumentoPaciente } from '../models/documento-paciente';

@Injectable({
	providedIn: 'root'
})
export class GestionAspiranteService {

  public aspirante: Aspirante = {
    pacienteId: 10319227,
    tipoIdentificacion: '',
    identificacion: '',
    nombre: '',
    grado: '',
    direccion: '',
    edad: 0,
    fechaNacimiento: '',
    sexo: '',
    nacionalidad: '',
    fuerza:  '',
    foto: '',
    firma: '',
    primerApellido: '',
    segundoApellido: '',
    swHabilitadoParaProceso: false
  };

  constructor(private _apiService: ApiService) { }

    getDatosAspirantebyDocumento(Tipo_Identificacion: string,Identificacion: string) {
        let params = new HttpParams();
        params = params.set("Tipo_Identificacion", Tipo_Identificacion)
                       .set("Identificacion", Identificacion);
        return this._apiService.get<BaseResponse<Aspirante>>(APIs.paciente.getDatosAspirante, false, params);
    }

    saveDocumentosAspirante(body: DocumentoPaciente) {
        return this._apiService.post<DocumentoPaciente,any>(APIs.paciente.saveDocumentosAspirante, body);
    }


}
