import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductTabPageRoutingModule } from './product-tab-routing.module';

import { ProductTabPage } from './product-tab.page';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';
import { RouterModule } from '@angular/router';

import { ComponentsModule } from '../../Components/components.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: ProductTabPage }]),
    ProductTabPageRoutingModule, 
    ComponentsModule
  ],
  declarations: [ProductTabPage]
})
export class ProductTabPageModule {}
