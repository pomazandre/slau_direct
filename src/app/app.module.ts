import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule, SharedModule, PanelModule,
        InputTextModule, FieldsetModule, ButtonModule } from 'primeng/primeng';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FieldsetModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    FieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
