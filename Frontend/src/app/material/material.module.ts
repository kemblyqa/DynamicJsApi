import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as m from '@angular/material';
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        m.MatFormFieldModule,
        m.MatInputModule,
        m.MatCardModule,
        m.MatButtonModule,
        m.MatTableModule,
        m.MatIconModule,
        m.MatPaginatorModule,
        m.MatDialogModule,
        m.MatChipsModule,
        m.MatToolbarModule,
        m.MatCheckboxModule,
        m.MatExpansionModule,
    ],
    exports: [
        m.MatFormFieldModule,
        m.MatInputModule,
        m.MatCardModule,
        m.MatButtonModule,
        m.MatTableModule,
        m.MatIconModule,
        m.MatPaginatorModule,
        m.MatDialogModule,
        m.MatChipsModule,
        m.MatToolbarModule,
        m.MatCheckboxModule,
        m.MatExpansionModule
    ]
})
export class MaterialModule { }
