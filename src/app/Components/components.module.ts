import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EmployeeInputComponent,
    EmployeeInfoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EmployeeInputComponent,
    EmployeeInfoComponent
  ]
})
export class ComponentsModule { }
