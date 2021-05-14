import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./Tabs/tabs/tabs.module').then(m => m.TabsPageModule)
  },  {
    path: 'employee-input',
    loadChildren: () => import('./pages/employee-input/employee-input.module').then( m => m.EmployeeInputPageModule)
  },
  {
    path: 'customer-input',
    loadChildren: () => import('./pages/customer-input/customer-input.module').then( m => m.CustomerInputPageModule)
  },
  {
    path: 'product-input',
    loadChildren: () => import('./pages/product-input/product-input.module').then( m => m.ProductInputPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
