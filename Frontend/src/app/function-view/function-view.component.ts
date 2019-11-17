import { Component, OnInit } from '@angular/core';
import { FunctionManagerService } from '../services/function-manager.service';

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
  constructor(private _funtionManagerService: FunctionManagerService) { }

  ngOnInit() {
  }
  getFunctions() {
    const filters = {

    };


  }

}
