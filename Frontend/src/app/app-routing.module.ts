import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionManagerComponent } from './function-manager/function-manager.component';
import { MainComponent } from './main/main.component';
import { AboutComponent } from './about/about.component';
import { FunctionViewComponent } from './function-view/function-view.component';
const routes: Routes = [
  { path: 'functions', component: FunctionManagerComponent },
  { path: 'home', component: MainComponent },
  { path: 'about', component: AboutComponent }, // This is for developers info.
  { path: 'function-view', component: FunctionViewComponent }, // This is to show functions.
  {path: '**', pathMatch: 'full', redirectTo: 'privileges'}
];

export const app_routing = RouterModule.forRoot(routes);
