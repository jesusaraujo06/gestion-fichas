import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { BaseResponse } from '../models/base-response';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private _httpClient: HttpClient,
  ) {}

  get<T>(url: string): Observable<BaseResponse<T>>;
  get<T>(url: string, externalApi?: boolean): Observable<T>;
  get<T>(url: string, externalApi?: boolean, params?: HttpParams): Observable<BaseResponse<T>>;

  public get<T>(
    url: string,
    externalApi: boolean = false,
    parameters?: HttpParams,
  ): Observable<BaseResponse<T>> | Observable<T> {

    if (externalApi) {
      return this._httpClient.get<T>(url).pipe(
        map((res) => {
          if(!res){
            this.handleError(res)
          }
         return res
        }),
        catchError(this.handleError.bind(this)),
      );
    }

    if (parameters){
      return this._httpClient.get<BaseResponse<T>>(url, { params: parameters}).pipe(
        map((res) => {
          if(res.isException){
            this.handleError(res.exceptionMessage)
          }
         return res
        }),
        catchError(this.handleError.bind(this)),
      );
    }

    return this._httpClient.get<BaseResponse<T>>(url).pipe(
      tap((res) => {
        if(res.isException){
          this.handleError(res.exceptionMessage)
        }
      }),
      map((res) => {
        return res
      }),
      catchError(this.handleError.bind(this))
    );

  }

  public post<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<TResponse> {
    return this._httpClient.post<TResponse>(url, body).pipe(
      map((res) => {
        if(!res){
          this.handleError(res)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  public put<TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Observable<BaseResponse<TResponse>> {
    return this._httpClient.put<BaseResponse<TResponse>>(url, body).pipe(
      map((res) => {
        if(res.isException){
          this.handleError(res.exceptionMessage)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  public delete<TResponse>(
    url: string,
  ): Observable<BaseResponse<TResponse>> {
    return this._httpClient.delete<BaseResponse<TResponse>>(url).pipe(
      map((res) => {
        if(res.isException){
          this.handleError(res.exceptionMessage)
        }
       return res
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: any) {
    let messageError = this.errorMgmt(error);
    // this._customDialogService.showErrorDialog(messageError);
    return throwError(() => error);
  }

  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else if (error.statusText == 'Forbidden' || error.status == 403) {
      errorMessage = 'Su sesión a finalizado, ingrese nuevamente';
    } else if (error.status == 401) {
      errorMessage = 'No autorizado para esta función';
    } else if (error.status == 404) {
      errorMessage = 'No se ha encontrado';
    }else if (error.status == 0) {
      errorMessage = 'No se puede conectar al servicio';
    }else if (error.status == 500) {
      errorMessage = 'Ha ocurrido un error verifique e intente de nuevo. si el error consiste comuniquese con sistemas';
    } else if (error.error) {
      errorMessage = `${error.error}`;
    } else {
      errorMessage = `${error}`;
    }

    return errorMessage
  }
}
