import { environment } from 'src/environments/environment';

export class APIs {

  static combo = {
    getParTipoDocumento: `${environment.apiParametrizacion}/api/ParTipoDocumento`,
    getParSede: `${environment.apiParametrizacion}/api/ParSedes`,
  }

  static usuario = {
    usuario: `${environment.apiUrl}/api/v1/Usuario`,
    usuarioSede: `${environment.apiUrl}/api/v1/UsuarioEps`,
    usuarioPermiso: `${environment.apiFuerzaArmada}/api/v1/usuario/GetPermisos`,
  }

  static medico = {
    getLogin: `${environment.apiUrlMedico}/api/Medico/ObtenerDatosLoginByLogin`,
    getObtemerEspecialidad: `${environment.apiUrlMedico}/api/Medico/ObtenerEspecialidadMedico`,
    getCitasDiasMedico: `${environment.apiFuerzaArmada}/api/v1/medico/GetCitasDiaMedico`,
    getProfesionalId: `${environment.apiFuerzaArmada}/api/v1/medico/GetProfesionalId`,
  }

  static paciente = {
    getDatosAspirante: `${environment.apiFuerzaArmada}/api/v1/usuario/GetDataAspirantePorDocumento`,
    saveDocumentosAspirante: `${environment.apiFuerzaArmada}/api/v1/aspirante/SaveDocumentosPaciente`,
    uploadFailManual: `${environment.apiFuerzaArmada}/api/v1/fichas/UploadManualFile`,
  }

  static ficha = {
    getFichas: `${environment.apiFuerzaArmada}/api/v1/fichas/GetTipoFicha`,
  }

}
