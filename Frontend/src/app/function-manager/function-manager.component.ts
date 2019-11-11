import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';
import { FunctionDialogService } from '../services/dialogs-services/function-dialog.service';

@Component({
  selector: 'app-function-manager',
  templateUrl: './function-manager.component.html',
  styleUrls: ['./function-manager.component.css']
})
export class FunctionManagerComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  displayedColumns: string[] = ['name', 'actions'];
  searchFilter: string;
  userFunctionsDataSource: any[] = [];

  user: string = "12345";

  constructor(
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService,
    private _functionDialog: FunctionDialogService,
  ) { }

  ngOnInit() {
    this._functionManagerService.getUserFunctions(this.user)
      .subscribe((response: any) => {
          this.userFunctionsDataSource = response;
      }, (err: any) => {
        this._toastr.error("No se pudieron cargar las funciones correctamente.")
      })
  }

  addFunction() {
    //agregar dialog
  }

  editFunction(element: any) {
    this._functionDialog.openDialog({
      idFunction: element.id,
      user: element.data.user,
      name: element.data.name,
      code: element.data.code,
      tag: element.data.tag,
      description: element.data.description,
      functions: element.data.functions
    })
      .subscribe((res: any) => {
        //guardar
        //cancelar
      })
  }

  deleteFunction(id: string) {
    //eliminar dialog
  }
}
