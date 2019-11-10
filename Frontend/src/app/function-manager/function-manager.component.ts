import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-function-manager',
  templateUrl: './function-manager.component.html',
  styleUrls: ['./function-manager.component.css']
})
export class FunctionManagerComponent implements OnInit {
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  searchFilter: string;
  constructor() { }

  ngOnInit() {
  }

  addFunction() {

  }

  editFunction(element: any) {

  }

  deleteFunction(id: string) {

  }
}
