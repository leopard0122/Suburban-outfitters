import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { ManageSuppliersComponent } from './admin-dashboard/manage-suppliers/manage-suppliers.component'
import { ManageCustomersComponent } from './admin-dashboard/manage-customers/manage-customers.component';
import { ManageProductsComponent } from './admin-dashboard/manage-products/manage-products.component';
import { ManageInventoryComponent } from './admin-dashboard/manage-inventory/manage-inventory.component';
import { MyOrdersComponent } from './customer-dashboard/my-orders/my-orders.component';
import { OrderDetailComponent } from './customer-dashboard/my-orders/order-detail/order-detail.component';
import { CreateCustomerComponent } from './admin-dashboard/manage-customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './admin-dashboard/manage-customers/edit-customer/edit-customer.component';
import { CreateInventoryItemComponent } from './admin-dashboard/manage-inventory/create-inventory-item/create-inventory-item.component';
import { EditInventoryItemComponent } from './admin-dashboard/manage-inventory/edit-inventory-item/edit-inventory-item.component';
import { CreateProductComponent } from './admin-dashboard/manage-products/create-product/create-product.component';
import { EditProductComponent } from './admin-dashboard/manage-products/edit-product/edit-product.component';
import { CreateSupplierComponent } from './admin-dashboard/manage-suppliers/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './admin-dashboard/manage-suppliers/edit-supplier/edit-supplier.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'product-detail/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'manage-suppliers', component: ManageSuppliersComponent, canActivate: [AuthGuard] },
  { path: 'manage-customers', component: ManageCustomersComponent, canActivate: [AuthGuard] },
  { path: 'manage-products', component: ManageProductsComponent, canActivate: [AuthGuard] },
  { path: 'manage-inventory', component: ManageInventoryComponent, canActivate: [AuthGuard] },
  { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGuard, AdminGuard],
    children: [
      {
        path:  'manage-customers',
        component:  ManageCustomersComponent
      },
      {
        path:  'create-customer',
        component:  CreateCustomerComponent
      },
      {
        path:  'edit-customer/:id',
        component:  EditCustomerComponent
      },
      {
        path:  'manage-inventory',
        component:  ManageInventoryComponent,
      }, 
      {
        path:  'create-inventory',
        component:  CreateInventoryItemComponent
      },
      {
        path:  'edit-inventory/:id',
        component:  EditInventoryItemComponent
      },      
      {
        path:  'manage-products',
        component:  ManageProductsComponent,
      }, 
      {
        path:  'create-product',
        component:  CreateProductComponent
      },
      {
        path:  'edit-product/:id',
        component:  EditProductComponent
      },
      {
        path:  'manage-suppliers',
        component:  ManageSuppliersComponent,
      },
      {
        path:  'create-supplier',
        component:  CreateSupplierComponent
      },
      {
        path:  'edit-supplier/:id',
        component:  EditSupplierComponent
      }
  ]},
  { path: 'customer-dashboard', component: CustomerDashboardComponent, canActivate: [AuthGuard],
    children: [
      {
        path:  'my-orders',
        component:  MyOrdersComponent,
      }

  ]},
  {
    path:  'order-detail/:id',
    component:  OrderDetailComponent
  },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
