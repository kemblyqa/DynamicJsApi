import { Component, OnInit } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-function-view',
  templateUrl: './function-view.component.html',
  styleUrls: ['./function-view.component.css']
})
export class FunctionViewComponent implements OnInit {

  // * Here some variable to control the filter parameters.
  name: string;
  code: string;
  username: string;
  description: string;
  tag: string;
  functionObtained: [];
  apiUrl: string = environment.apiBaseUrl;
  constructor(private _funtionManagerService: FunctionManagerService,
    private _toastr: ToastrService, ) { }

  ngOnInit() {
    this._funtionManagerService.searchFunction({})
      .subscribe((response: any) => {
        this.functionObtained = response;
        if (this.functionObtained.length === 0) {
          this._toastr.error('¡Función no encontrada!');
        }
      }, (err: any) => {
        this._toastr.error('¡Un error a ocurrido durante la solicitud!');
      });
  }
  /**
   * * @function GetFunctions obtains all functions saved in database using the filters.
   */
  public GetFunctions() {
    let strRequest = '{';
    if (this.name !== undefined) {
      strRequest += `"function_name": "${this.name}"`;
    }
    if (this.username !== undefined) {
      strRequest += ((strRequest.length > 1) ? `,"username": "${this.username}"` : `"username": "${this.username}"`);
    }
    if (this.description !== undefined) {
      strRequest += ((strRequest.length > 1) ? `,"description": "${this.description}"` : `"description": "${this.description}"`);
    }
    if (this.code !== undefined) {
      strRequest += ((strRequest.length > 1) ? `,"code": "${this.code}"` : `"code": "${this.code}"`);
    }
    if (this.tag !== undefined) {
      strRequest += ((strRequest.length > 1) ? `,"tag": "${this.tag}"` : `"tag": "${this.tag}"`);
    }
    if (strRequest === '{') {
      this._toastr.error('¡Debe seleccionar algún filtro!');
    } else {
      strRequest += '}';

      const object = JSON.parse(strRequest);
      // Call service to do a petition to get all functions.
      this._funtionManagerService.searchFunction(object)
        .subscribe((response: any) => {
          this.functionObtained = response;
          console.log(this.functionObtained);
          if (this.functionObtained.length === 0) {
            this._toastr.error('¡Función no encontrada!');
          }
        }, (err: any) => {
          this._toastr.error('¡Un error a ocurrido durante la solicitud!');
        });
    }
  }


}


