import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, of, Subscription, fromEvent } from 'rxjs';
import { map, catchError, filter, distinctUntilChanged, tap, debounceTime } from 'rxjs/operators';
import { FunctionManagerService } from 'src/app/services/function-manager.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.css']
})
export class AddFunctionComponent implements OnInit {
  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  autoCompleteSubscription$: Subscription = new Subscription();
  functionNameSearchAutoComplete$: Observable<any> = null;
  functionFormGroup: FormGroup;
  searchFilter: string;
  dependences: any[] = [];
  constructor(
    public dialogRef: MatDialogRef<AddFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder,
    private _functionManagerService: FunctionManagerService,
    private _toastr: ToastrService,
  ) { }
  ngOnInit() {
    this.dependences = [];
    this.functionFormGroup = this._formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(256)]),
      tag: new FormControl('', [Validators.required, Validators.maxLength(128)]),
      code: new FormControl('', [Validators.required]),
      functions: new FormControl([]),
    });
    if (this.data.modify) {
      this.functionFormGroup.setValue({
        name: this.data.name,
        description: this.data.description,
        tag: this.data.tag,
        code: this.data.code,
        functions: []
      })
      this.dependences = this.data.functions;
    }
    this.autoCompleteSubscription$ = fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        tap(() => this.functionNameSearchAutoComplete$ = this.searchFilter !== '' ? this.lookup(this.searchFilter) : null)
      )
      .subscribe();
  }
  lookup(value: string): Observable<any> {
    return this._functionManagerService.searchFunction({
      function_name: value
    })
      .pipe(
        map(results => results),
        catchError(_ => {
          return of(null);
        })
      );
  }
  getDependency(event: any) {
    this.searchFilter = '';
    this.functionNameSearchAutoComplete$ = null;
    if (!this.isDependendyAlreadyAdded(event.id))
      this.dependences.push({ id: event.id, name: event.data.name });
    else this._toastr.error("Esta dependencia ya pertenece a la lista")
  }
  isDependendyAlreadyAdded(id: string): boolean {
    for (var i = 0; i < this.dependences.length; i++)
      if (this.dependences[i].id === id)
        return true;
    return false;
  }
  removeDependency(dependendy: any) {
    for (var i = 0; i < this.dependences.length; i++) {
      if (this.dependences[i].id === dependendy.id) {
        this.dependences.splice(i, 1);
        return;
      }
    }
  }
  onSave() {
    if (this.functionFormGroup.valid) {
      let dependencesIds = [];
      this.dependences.forEach(element => {
        dependencesIds.push(element.id)
      });
      this.functionFormGroup.get('functions').setValue(dependencesIds);
      this.dialogRef.close(this.functionFormGroup.value);
    } else this._toastr.error("Debe llenar todos los campos requeridos.")
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
