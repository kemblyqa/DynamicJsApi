import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserFunction } from 'src/app/models/user-function';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.css']
})
export class AddFunctionComponent implements OnInit {
  functionFormGroup: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddFunctionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    this.functionFormGroup = this._formBuilder.group({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      tag: new FormControl('', [Validators.required]),
      code: new FormControl('', [Validators.required]),
      functions: new FormControl('', [Validators.required]),
    });
    if (this.data.modify) {
      this.functionFormGroup.setValue({
        name: this.data.name,
        description: this.data.description,
        tag: this.data.tag,
        code: this.data.code,
        functions: this.data.functions
      })
    }
  }
  onSave() {
    if (this.functionFormGroup.valid)
      this.dialogRef.close(this.functionFormGroup.value);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
