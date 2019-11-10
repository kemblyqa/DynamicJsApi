import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionManagerComponent } from './function-manager/function-manager.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'main', pathMatch: 'full'
  },
  {
    path: 'main', component: MainComponent, children: [
      {
        path: 'functions', component: FunctionManagerComponent
      },
    ]
  },
  {
    path: '**', redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }