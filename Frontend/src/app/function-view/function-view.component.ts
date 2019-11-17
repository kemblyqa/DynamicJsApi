import { Component, OnInit } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';

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
  functionObtained: any;
  constructor(private _funtionManagerService: FunctionManagerService,
    private _toastr: ToastrService, ) { }

  ngOnInit() {
  }
  /**
   * * @function GetFunctions obtains all functions saved in database using the filters.
   */
  public GetFunctions() {
    if (this.username === undefined && this.tag === undefined && this.description === undefined
      && this.code === undefined && this.name === undefined) {
      this._toastr.error('You have to provide some filter to charge the functions');
    } else {
      //  Set filters file.
      const filters = {
        username: this.username,
        tag: this.tag,
        description: this.description,
        code: this.code,
        function_name: name
      };
      // Call service to do a petition to get all functions.
      this._funtionManagerService.searchFunction(filters)
        .subscribe((response: any) => {
          this.functionObtained = response;
        }, (err: any) => {
          this._toastr.error('No se pudieron cargar las funciones correctamente.');
        });
    }

  }

}
