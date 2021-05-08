import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    EmployeeInputComponent,
    EmployeeInfoComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EmployeeInputComponent,
    EmployeeInfoComponent,
    TemplateComponent
  ]
})
export class ComponentsModule { }
