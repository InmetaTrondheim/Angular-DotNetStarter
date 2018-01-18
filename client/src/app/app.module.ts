import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ValuesService } from './core/services/values.service';
import { ValuesComponent } from './values/values.component';
import { HttpClientModule } from '@angular/common/http';
import { SendValuesComponent } from './send-values/send-values.component';

@NgModule({
  declarations: [
    AppComponent,
    ValuesComponent,
    SendValuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ValuesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
