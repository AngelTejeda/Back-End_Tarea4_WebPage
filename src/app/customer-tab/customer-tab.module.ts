import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerTab } from './customer-tab.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CustomerTabPageRoutingModule } from './customer-tab-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CustomerTabPageRoutingModule
  ],
  declarations: [CustomerTab]
})
export class CustomerTabPageModule {}
