import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './shared/header/header.component';

import { DatePipe } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';

import { SignupModule } from './modules/pages/signup/signup.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatIconModule, 
    FormsModule, 
    ReactiveFormsModule
  ],

  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }