import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionManagerComponent } from './function-manager/function-manager.component';
import { MainComponent } from './main/main.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';
import { FunctionViewComponent } from './function-view/function-view.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'login', component: LogInComponent, data: { login: true }, canActivate: [AuthGuard]
  },
  {
    path: 'functions', component: FunctionManagerComponent, canActivate: [AuthGuard]
  },
  { 
    path: 'home', component: MainComponent 
  },
  { 
    path: 'about', component: AboutComponent 
  }, // This is for developers info.
  { 
    path: 'function-view', component: FunctionViewComponent 
  }, // This is to show functions.
  {
    path: '**', redirectTo: 'home'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

