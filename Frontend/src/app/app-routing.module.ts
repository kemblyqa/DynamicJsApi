import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionManagerComponent } from './function-manager/function-manager.component';
import { MainComponent } from './main/main.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: LogInComponent 
  },
  {
    path: 'main', component: MainComponent,  canActivate: [AuthGuard], children: [
      {
        path: 'functions', component: FunctionManagerComponent
      },
    ]
  },
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }