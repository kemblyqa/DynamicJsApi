import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

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
    return this._httpClient.put(`${this.apiUrl}Add`, params);
  }

  /**
   * @function updateFunction Busca a la función y la actualiza
   */
  updateFunction(params: any) {
    return this._httpClient.post(`${this.apiUrl}Update`, params);
  }

  /**
   * @function deleteFunction Busca la función y la elimina
   */
  deleteFunction(idFunction: string) {
    return this._httpClient.delete(`${this.apiUrl}Delete`, {
      params: new HttpParams()
        .set("idFunction", idFunction)
    });
  }

  /**
   * @function getUserFunctions Busca a un usuario y obtiene las funciones que le pertenecen 
   */
  getUserFunctions(user: string){
    return this._httpClient.get(`${this.apiUrl}Get`, {
      params: new HttpParams()
        .set("user", user)
    });
  }

  /**
   * @function getFunctionCode Busca una función y obtiene el código de ella junto al 
   * código de funciones asociadas 
   */
  getFunctionCode(idFunction: string){
    return this._httpClient.get(`${this.apiUrl}Code`, {
      params: new HttpParams()
        .set("idFunction", idFunction)
    });
  }

  /**
   * @function searchFunction Busca funciones asociadas a los parámetros de búsqueda 
   * (username, tag, description, code, function_name) cualquiera de estos puede venir 
   * o no siempre y cuando al menos haya un parámetro de búsqueda.
   */
  searchFunction(params: any){
    this._httpClient.get(`${this.apiUrl}Search`, {
      params: params
    });
  }
}
