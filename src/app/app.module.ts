import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CustomToolPanelComponent, CustomHeaderComponent } from './components';

const COMP: any[] = [
  CustomToolPanelComponent,
  CustomHeaderComponent
];

@NgModule({
  declarations: [
    AppComponent,
    COMP
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  entryComponents: [
    COMP
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
