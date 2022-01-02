import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {Step1Component} from "./steps/one/step1.component";
import {Step2Component} from "./steps/two/step2.component";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {SecTransformPipe} from "./pipe/sec.transform.pipe";
import {Step3Component} from "./steps/three/step3.component";
import {BuilderComponent} from "./steps/builder/builder.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TimeinputComponent} from "./components/timeinput/timeinput.component";
import {RouterModule} from "@angular/router";
import {CustomComponent} from "./steps/custom/custom.component";
import {OverrideMaximumComponent} from "./components/override-maximum/override-maximum.component";

@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    BuilderComponent,
    CustomComponent,
    SecTransformPipe,
    TimeinputComponent,
    OverrideMaximumComponent,
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
