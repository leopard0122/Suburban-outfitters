import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AppState } from './store/app.state';
// Angular Material Components
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
// END Material
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CustomerDashboardComponent } from './customer-dashboard/customer-dashboard.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SearchPipe } from './pipes/search/search.pipe';
import { CartComponent } from './cart/cart.component';
import { ManageCustomersComponent } from './admin-dashboard/manage-customers/manage-customers.component';
import { ManageProductsComponent } from './admin-dashboard/manage-products/manage-products.component';
import { ManageSuppliersComponent } from './admin-dashboard/manage-suppliers/manage-suppliers.component';
import { ManageInventoryComponent } from './admin-dashboard/manage-inventory/manage-inventory.component';
import { environment } from 'src/environments/environment';
import { MyOrdersComponent } from './customer-dashboard/my-orders/my-orders.component';
import { OrderDetailComponent } from './customer-dashboard/my-orders/order-detail/order-detail.component';
import { ReturnItemComponent } from './customer-dashboard/my-orders/order-detail/return-item/return-item.component';
import { ChangeEmailDialogComponent } from './customer-dashboard/change-email-dialog/change-email-dialog.component';
import { ChangeAddressDialogComponent } from './customer-dashboard/change-address-dialog/change-address-dialog.component';
import { ChangePaymentDialogComponent } from './customer-dashboard/change-payment-dialog/change-payment-dialog.component';
import { EditCustomerComponent } from './admin-dashboard/manage-customers/edit-customer/edit-customer.component';
import { CreateCustomerComponent } from './admin-dashboard/manage-customers/create-customer/create-customer.component';
import { EditInventoryItemComponent } from './admin-dashboard/manage-inventory/edit-inventory-item/edit-inventory-item.component';
import { CreateInventoryItemComponent } from './admin-dashboard/manage-inventory/create-inventory-item/create-inventory-item.component';
import { CreateProductComponent } from './admin-dashboard/manage-products/create-product/create-product.component';
import { EditProductComponent } from './admin-dashboard/manage-products/edit-product/edit-product.component';
import { CreateSupplierComponent } from './admin-dashboard/manage-suppliers/create-supplier/create-supplier.component';
import { EditSupplierComponent } from './admin-dashboard/manage-suppliers/edit-supplier/edit-supplier.component';
import { ReturnItemDialogComponent } from './customer-dashboard/return-item-dialog/return-item-dialog.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { httpInterceptorProviders } from './http-interceptors';
import { ChangePasswordDialogComponent } from './customer-dashboard/change-password-dialog/change-password-dialog.component';
import { WrongPasswordDialogComponent } from './login/wrong-password-dialog/wrong-password-dialog.component';
import { AuthService } from './services/auth.service';
import { ShareModule } from '@ngx-share/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ProductsComponent,
    ProductDetailComponent,
    CustomerDashboardComponent,
    AdminDashboardComponent,
    SearchPipe,
    CartComponent,
    ManageCustomersComponent,
    ManageProductsComponent,
    ManageSuppliersComponent,
    ManageInventoryComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    ReturnItemComponent,
    ChangeEmailDialogComponent,
    ChangeAddressDialogComponent,
    ChangePaymentDialogComponent,
    EditCustomerComponent,
    CreateCustomerComponent,
    EditInventoryItemComponent,
    CreateInventoryItemComponent,
    CreateProductComponent,
    EditProductComponent,
    CreateSupplierComponent,
    EditSupplierComponent,
    ReturnItemDialogComponent,
    UnauthorizedComponent,
    ChangePasswordDialogComponent,
    WrongPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxsModule.forRoot(AppState),
    NgxsFormPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production
    }),  // Should be the last module to import for ngxs
    MatBadgeModule,
    MatCardModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    HttpClientModule,
    ShareModule,
    FontAwesomeModule
  ],
  providers: [CookieService, AuthService, httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
