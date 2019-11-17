import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-function-view',
  templateUrl: './function-view.component.html',
  styleUrls: ['./function-view.component.css']
})
export class FunctionViewComponent implements OnInit {

  // * Here some variable to control the filter parameters.
  name_checked = false;
  descrip_checked = false;
  tag_checked = false;

  constructor() { }

  ngOnInit() {
  }

}
