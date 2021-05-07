import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeTabPage } from './employee-tab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { EmployeeTabPageRoutingModule } from './employee-tab-routing.module';
import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: EmployeeTabPage }]),
    EmployeeTabPageRoutingModule,
  ],
  declarations: [EmployeeTabPage]
})
export class EmployeeTabPageModule {}
