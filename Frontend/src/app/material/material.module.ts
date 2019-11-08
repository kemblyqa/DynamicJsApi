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
        m.MatSortModule,
        m.MatDialogModule,
    ],
    exports: [
        m.MatFormFieldModule,
        m.MatInputModule,
        m.MatCardModule,
        m.MatButtonModule,
        m.MatTableModule,
        m.MatIconModule,
        m.MatPaginatorModule,
        m.MatSortModule,
        m.MatDialogModule,
    ]
})
export class MaterialModule { }