import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-function-manager',
  templateUrl: './function-manager.component.html',
  styleUrls: ['./function-manager.component.css']
})
export class FunctionManagerComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  displayedColumns: string[] = ['name', 'actions'];
  searchFilter: string;
  userFunctionsDataSource: any[];

  user: string = "12345";

  constructor(
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService
  ) { }

  ngOnInit() {
    this._functionManagerService.getUserFunctions(this.user)
      .subscribe((response: any) => {
        console.log(response);
        this.userFunctionsDataSource = response;
      }, (err: any) => {
        this._toastr.error("No se pudieron cargar las funciones correctamente.")
      })
  }

  addFunction() {

  }

  editFunction(element: any) {

  }

  deleteFunction(id: string) {

  }

  createFunction() {

  }
}
