import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerInfoComponent} from './customer-info/customer-info.component';
import {ProductInfoComponent} from './product-info/product-info.component';
import { EmployeeInputComponent } from './employee-input/employee-input.component';
import { EmployeeInfoComponent } from './employee-info/employee-info.component';
import { FormsModule } from '@angular/forms';
import { TemplateComponent } from './template/template.component';

@NgModule({
  declarations: [
    EmployeeInputComponent,
    EmployeeInfoComponent,
    CustomerInfoComponent,
    ProductInfoComponent,
    TemplateComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    EmployeeInputComponent,
    EmployeeInfoComponent,
    CustomerInfoComponent,
    ProductInfoComponent,
    TemplateComponent
  ]
})
export class ComponentsModule { }
