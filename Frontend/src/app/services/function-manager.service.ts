import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FunctionManagerService {
  apiUrl: string = environment.apiBaseUrl;
  constructor(private _httpClient: HttpClient) { }

  /**
   * @function addFunction Agrega una nueva función
   */
  addFunction(params: any) {
    return this._httpClient.put(`${this.apiUrl}add`, params);
  }

  /**
   * @function updateFunction Busca a la función y la actualiza
   */
  updateFunction(params: any) {
    return this._httpClient.post(`${this.apiUrl}update`, params);
  }

  /**
   * @function deleteFunction Busca la función y la elimina
   */
  deleteFunction(id: string) {
    return this._httpClient.delete(`${this.apiUrl}delete`, {
      params: new HttpParams()
        .set("id", id)
    });
  }

  /**
   * @function getUserFunctions Busca a un usuario y obtiene las funciones que le pertenecen
   */
  getUserFunctions(user: string){
    return this._httpClient.get(`${this.apiUrl}get`, {
      params: new HttpParams()
        .set("user", user)
    })
    .pipe(map(res => res["data"]));
  }

  /**
   * @function getFunctionCode Busca una función y obtiene el código de ella junto al
   * código de funciones asociadas
   */
  getFunctionCode(id: string){
    return this._httpClient.get(`${this.apiUrl}code`, {
      params: new HttpParams()
        .set("id", id)
    })
  }

  /**
   * @function searchFunction Busca funciones asociadas a los parámetros de búsqueda
   * (username, tag, description, code, function_name) cualquiergit a de estos puede venir
   * o no siempre y cuando al menos haya un parámetro de búsqueda.
   */
  searchFunction(params: any){
    return this._httpClient.get(`${this.apiUrl}search`, {
      params: params
    })
    .pipe(map(res => res['data']));
  }

  /**
   * @function getFunctionInformation Busca una función y retorna su información
   * @param id
   */
  getFunctionInformation(id: string){
    return this._httpClient.get(`${this.apiUrl}information`, {
     params: new HttpParams()
     .set("id", id)
    })
    .pipe(map(res => res['data']['name']));
  }
}
