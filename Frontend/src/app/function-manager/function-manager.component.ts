import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';
import { FunctionDialogService } from '../services/dialogs-services/function-dialog.service';
import { AlertDialogService } from '../services/alert-dialog/alert-dialog.service';

@Component({
  selector: 'app-function-manager',
  templateUrl: './function-manager.component.html',
  styleUrls: ['./function-manager.component.css']
})
export class FunctionManagerComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  displayedColumns: string[] = ['name', 'tag', 'actions'];
  searchFilter: string;
  userFunctionsDataSource: any[] = [];

  user: string = "12345";

  constructor(
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService,
    private _functionDialog: FunctionDialogService,
    private _alertDialog: AlertDialogService,
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
    this._functionDialog.createOrModifyDialog({
      modify: false
    })
      .subscribe(accept => {
        //guardar
        //cancelar
      })
  }

  editFunction(element: any) {
    this._functionDialog.createOrModifyDialog({
      id: element.id,
      user: element.data.user,
      name: element.data.name,
      code: element.data.code,
      tag: element.data.tag,
      description: element.data.description,
      functions: element.data.functions,
      modify: true
    })
      .subscribe(accept => {
        //guardar
        //cancelar
      })
  }

  viewFunction(element: any) {
    this._functionDialog.openDialog({
      id: element.id,
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
    this._alertDialog.alertDialog(
      "Eliminar función", 
      "Está seguro de que desea eliminar esta función?",
      true
    )
      .subscribe(accept => {
        if (accept) {
          this._functionManagerService.deleteFunction(id)
            .subscribe(
              () => {
                this._toastr.success("Se ha eliminado exitosamente esta función.")
              }, () => {
                this._toastr.error("Ha ocurrido un problema, póngase en contacto con soporte.")
              })
        }
      })
  }
}
