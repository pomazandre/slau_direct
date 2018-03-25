import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DataTableModule, SharedModule, PanelModule,
        InputTextModule, FieldsetModule, ButtonModule } from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import { AppComponent } from './app.component';
import { DecisionService } from './services/solve';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FieldsetModule,
    PanelModule,
    ButtonModule,
    InputTextModule,
    DataTableModule,
    SharedModule,
    ButtonModule,
    FieldsetModule,
    MessagesModule
  ],
  providers: [DecisionService],
  bootstrap: [AppComponent]
})

export class AppModule { }
