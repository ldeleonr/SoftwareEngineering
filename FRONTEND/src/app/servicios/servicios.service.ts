import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { pipe, throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';


@Injectable({
    providedIn : 'root'
})

export class Servicios {
   baseUrl = environment.baseURL;
   urlUsers = this.baseUrl + '/users';
   urlRoles = this.baseUrl + '/roles';
   urlCatByDatoPadre = this.baseUrl + '/catalogobydato';
   urlPuntosAtencion = this.baseUrl + '/puntoatencion';
   urlTipoQuejas = this.baseUrl + '/tipoquejas';
   UrlBancoQuejas = this.baseUrl +'/bancoquejas';

   constructor(private http: HttpClient) { }

   getHeadders(){
    const httpOptions= {
      headers: new HttpHeaders({
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': '25'
      })
    };
    return httpOptions;
   }

   public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        if (error.status === 200) {
            // console.log('carga-archivo: sin error HttpErrorResponse');
        } else {
            // console.error('carga-archivo: Ocurrio un error:', error.error.message);
        }

    } else {
        if (error.status === 200) {
            // console.log('carga-archivo: sin error HttpErrorResponse');
        } else {
            // console.error('carga-archivo::Código de respuesta ' + error.status +', body was: ' + error.error);
        }
    }
    return throwError(
        'carga-archivo: Algo malo paso, por favor intente mas tarde.');
};


  public getLogin(login: Object) : Observable <any> {
    return this.http.post <any>(`${this.urlUsers}/authenticate`, login);
   }

   public getRol(userID: any) : Observable <any> {
    return this.http.get<any>(`${this.urlRoles}/user/${userID}`);
   }
   public getdatoByDatoPadre(datoPadre: any) : Observable <any> {
    return this.http.get<any>(`${this.urlCatByDatoPadre}/dato/${datoPadre}`);
   }
   public addPuntoAtencion(puntoAtencion: Object) : Observable <any> {
    return this.http.post<any>(`${this.urlPuntosAtencion}/save`, puntoAtencion);
   }

   public getAllPuntosAtencioin():Observable<any>{
     return this.http.get(`${this.urlPuntosAtencion}`);
   }

   public updatePuntosAtencion(id:any,puntoAtencion: Object):Observable<any>{
    return this.http.put(`${this.urlPuntosAtencion}/${id}`, puntoAtencion);
  }
  public getAllUsers():Observable<any> {
    return this.http.get(`${this.urlUsers}`);
  }
  public addUser(user: Object) : Observable <any> {
    return this.http.post<any>(`${this.urlUsers}`, user);
   }
   public updateUser(id:any, users: Object):Observable<any>{
    return this.http.put(`${this.urlUsers}/${id}`, users);
  }
  public getAllTipoQuejas():Observable<any> {
    return this.http.get(`${this.urlTipoQuejas}`);
  }
  public addTipoQueja(tipoQueja: Object) : Observable <any> {
    return this.http.post<any>(`${this.urlTipoQuejas}/save`, tipoQueja);
   }
  public updateTipoQueja(id:any,tipoQueja:Object):Observable <any>{
    return this.http.put(`${this.urlTipoQuejas}/${id}`, tipoQueja);
  }

  public getAllTiposQuejas():Observable<any>{
    return this.http.get(`${this.urlTipoQuejas}`);
  }

  public getAllQuejas():Observable<any>{
    return this.http.get(`${this.UrlBancoQuejas}`);
  }

  public addQueja(queja: Object) : Observable <any> {
    return this.http.post<any>(`${this.UrlBancoQuejas}`, queja);
   }

}
