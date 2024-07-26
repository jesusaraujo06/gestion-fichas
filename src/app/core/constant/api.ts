import { environment } from 'src/environments/environment';

export class APIs {

  static combo = {
    //Globales
    getParTipoDocumento: `${environment.apiParametrizacion}/api/ParTipoDocumento`,
    getParSede: `${environment.apiParametrizacion}/api/ParSedes`,
  }



  static usuario = {
    usuario: `${environment.apiUrl}/api/v1/Usuario`,
    usuarioSede: `${environment.apiUrl}/api/v1/UsuarioEps`
  }

  static medico = {
    getLogin: `${environment.apiUrlMedico}/api/Medico/ObtenerDatosLoginByLogin`,
  }
}
