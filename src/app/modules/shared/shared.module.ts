import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomInputComponent } from './inputs/custom-input/custom-input.component';
import { CustomErrorComponent } from './inputs/custom-error/custom-error.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CustomInputComponent,
    CustomErrorComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    FormsModule
  ], 
  exports: [
    CustomInputComponent,
    CustomErrorComponent,
  ]
})
export class SharedModule { }
