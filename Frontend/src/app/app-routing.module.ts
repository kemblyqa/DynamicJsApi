import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionManagerComponent } from './function-manager/function-manager.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'dashboard', pathMatch: 'full'
  // },
  // {
  //   path: '**', redirectTo: 'dashboard'
  // },
  // {
  //   path: 'dashboard', component: , , children: []
  // },
  {
    path: 'function-manager', component: FunctionManagerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }