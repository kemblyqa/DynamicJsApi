import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { app_routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FunctionManagerComponent } from './function-manager/function-manager.component';
import { MainComponent } from './main/main.component';
import { MaterialModule } from "./material/material.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FunctionManagerService } from './services/function-manager.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { FunctionDialogComponent } from './dialogs/function-dialog/function-dialog.component';
import { FunctionDialogService } from './services/dialogs-services/function-dialog.service';
import { AddFunctionComponent } from './dialogs/add-function/add-function.component';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { AlertDialogService } from './services/alert-dialog/alert-dialog.service';
import { FunctionViewComponent } from './function-view/function-view.component';
import { AboutComponent } from './about/about.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    FunctionManagerComponent,
    MainComponent,
    FunctionDialogComponent,
    AddFunctionComponent,
    AlertDialogComponent
    FunctionViewComponent,
    AboutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ToastrModule.forRoot(
      {
        timeOut: 3500,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
      }
    ), NgbModule
  ],
  entryComponents: [FunctionDialogComponent, AddFunctionComponent, AlertDialogComponent],
  providers: [
    FunctionManagerService, 
    FunctionDialogService,
    AlertDialogService,  
    { 
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher 
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
