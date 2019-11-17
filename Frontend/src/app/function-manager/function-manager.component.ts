import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';
import { FunctionDialogService } from '../services/dialogs-services/function-dialog.service';
import { AlertDialogService } from '../services/alert-dialog/alert-dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-function-manager',
  templateUrl: './function-manager.component.html',
  styleUrls: ['./function-manager.component.css']
})
export class FunctionManagerComponent implements OnInit, OnDestroy {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  displayedColumns: string[] = ['name', 'tag', 'actions'];
  searchFilter: string;
  userFunctionsDataSource: any[] = [];
  functionsSubscription: Subscription;
  user: string = "12345";

  constructor(
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService,
    private _functionDialog: FunctionDialogService,
    private _alertDialog: AlertDialogService,
  ) { }

  ngOnInit() {
    this.loadFunctions();
  }

  loadFunctions() {
    this.functionsSubscription = this._functionManagerService.getUserFunctions(this.user)
      .subscribe((response: any) => {
        this.userFunctionsDataSource = response;
      }, (err: any) => {
        this._toastr.error("No se pudieron cargar las funciones correctamente.")
      });
  }

  addFunction() {
    this._functionDialog.createOrModifyDialog({
      modify: false
    })
      .subscribe(data => {
        if (data) {
          this._functionManagerService.addFunction({
            user: data.user,
            code: data.code,
            tag: data.tag,
            name: data.name,
            description: data.description,
            functions: data.functions
          })
            .subscribe(
              response => {
                // console.log(response);
                this._toastr.success("Función creada exitosamente.");
                this.loadFunctions();
              }, () => {
                this._toastr.error("Hubo un problema al crear la función, intente nuevamente.")
              })
        }
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
    .subscribe(data => {
      if (data) {
        this._functionManagerService.updateFunction({
          id: element.data.id,
          user: data.user,
          code: data.code,
          tag: data.tag,
          name: data.name,
          description: data.description,
          functions: data.functions
        })
          .subscribe(
            response => {
              // console.log(response);
              this._toastr.success("Función actualizada exitosamente.");
              this.loadFunctions();
            }, () => {
              this._toastr.error("Hubo un problema al crear la función, intente nuevamente.")
            })
      }
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
    }).subscribe();
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

  ngOnDestroy() {
    this.functionsSubscription.unsubscribe()
  }
}
