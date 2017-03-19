import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { NascarService } from './nascar.service';
import { ParticipantRowComponent } from './participant-row/participant-row.component';
import { DriverSummaryComponent } from './driver-summary/driver-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    ParticipantRowComponent,
    DriverSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [NascarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
