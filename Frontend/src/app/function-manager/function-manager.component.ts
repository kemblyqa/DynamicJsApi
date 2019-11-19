import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';
import { FunctionDialogService } from '../services/dialogs-services/function-dialog.service';
import { AlertDialogService } from '../services/alert-dialog/alert-dialog.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/shared/auth.service';
import { User } from '../models/user';

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
  dialogSubscription: Subscription = new Subscription();
  user: User;
  functionObtained: any[] = [];
  name: string;
  description: string;
  tag: string;
  params: any = {};
  constructor(
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService,
    private _functionDialog: FunctionDialogService,
    private _alertDialog: AlertDialogService,
    private _authService: AuthService,
  ) { }

  ngOnInit() {
    this.user = this._authService.isLoggedIn ? this._authService.userInfo() : null;
    this.loadFunctions();
  }

  loadFunctions() {
    this.functionsSubscription = this._functionManagerService.getUserFunctions(this.user.uid)
      .subscribe((response: any) => {
        this.userFunctionsDataSource = response;
      }, (err: any) => {
        this._toastr.error("No se pudieron cargar las funciones correctamente.")
      });
  }

  search() {
    if ((this.name === undefined || this.name === "") &&
      (this.description === undefined || this.description === "") &&
      (this.tag === undefined || this.tag === "")) {
      this.loadFunctions();
    } else {
      this.params = {};
      if (this.name !== undefined || this.name !== "") {
        this.params.function_name = this.name;
      }
      if (this.description !== undefined || this.description !== "") {
        this.params.description = this.description;
      }
      if (this.tag !== undefined || this.tag !== "") {
        this.params.tag = this.tag;
      }
      this.params.user = this.user.uid;
      this._functionManagerService.searchFunction(this.params)
        .subscribe((response: any) => {
          this.functionObtained = response;
          if (this.functionObtained.length === 0) {
            this._toastr.error('Funciones no encontradas!');
            this.cleanFilters();
          } else {
            this.userFunctionsDataSource = this.functionObtained;
          }
        }, (err: any) => {
          this._toastr.error("Un error ha ocurrido durante la solicitud.")
        });
    }
  }

  cleanFilters() {
    this.name = ''; this.description = '', this.tag = '';
    this.functionObtained = [];
    this.loadFunctions();
  }

  addFunction() {
    this.dialogSubscription = this._functionDialog.createOrModifyDialog({
      modify: false
    })
      .subscribe(data => {
        if (data) {
          this._functionManagerService.addFunction({
            user: this.user.uid,
            code: data.code,
            tag: data.tag,
            name: data.name,
            description: data.description,
            functions: data.functions
          })
            .subscribe(
              response => {
                this._toastr.success("Función creada exitosamente.");
                this.loadFunctions();
              }, (err) => {
                this._toastr.error("Un error ha ocurrido durante la solicitud.")
              })
        }
      })
  }

  editFunction(element: any) {
    this.dialogSubscription = this._functionDialog.createOrModifyDialog({
      id: element.id,
      user: this.user.uid,
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
            id: element.id,
            user: this.user.uid,
            code: data.code,
            tag: data.tag,
            name: data.name,
            description: data.description,
            functions: data.functions
          })
            .subscribe(
              response => {
                this._toastr.success("Función actualizada exitosamente.");
                this.loadFunctions();
              }, () => {
                this._toastr.error("Un error ha ocurrido durante la solicitud.")
              })
        }
      })
  }

  viewFunction(element: any) {
    this.dialogSubscription = this._functionDialog.openDialog({
      id: element.id,
      user: this.user.uid,
      name: element.data.name,
      code: element.data.code,
      tag: element.data.tag,
      description: element.data.description,
      functions: element.data.functions
    }).subscribe();
  }

  deleteFunction(id: string) {
    this.dialogSubscription = this._alertDialog.alertDialog(
      "Eliminar función",
      "Está seguro de que desea eliminar esta función?",
      true
    )
      .subscribe(accept => {
        if (accept) {
          this._functionManagerService.deleteFunction(id)
            .subscribe(
              () => {
                this._toastr.success("Se ha eliminado exitosamente esta función.");
                this.loadFunctions();
              }, () => {
                this._toastr.error("Un error ha ocurrido durante la solicitud.")
              })
        }
      })
  }

  ngOnDestroy() {
    this.functionsSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
  }
}
