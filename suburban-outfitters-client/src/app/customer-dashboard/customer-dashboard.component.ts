import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangeAddressDialogComponent } from './change-address-dialog/change-address-dialog.component';
import { ChangeEmailDialogComponent } from './change-email-dialog/change-email-dialog.component';
import { ChangePaymentDialogComponent } from './change-payment-dialog/change-payment-dialog.component';
import { ReturnItemDialogComponent } from './return-item-dialog/return-item-dialog.component';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ChangePasswordDialogComponent } from './change-password-dialog/change-password-dialog.component';
import { CreditCardService } from '../services/credit-card.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {
  credit_cards: any[] = [
    {
      first_name: 'Jesse',
      last_name: 'Spencer',
      card_number: '1111222233334444',
      expiration: new Date('1/1/20'),
    }
  ];

  customer = {
    name: 'John Smith',
    address: '12345 TEST AVE, SLC, UT 813456',
    email: 'johnsmith@utah.edu',
    creditcard: '5252'
  };

  orders = [{
    orderNumber: 123456789,
    price: 45.00,
    status: 'Shipped'
  },
  {
    orderNumber: 123456888,
    price: 15.00,
    status: 'Processing'
  },
  {
    orderNumber: 123457777,
    price: 23.00,
    status: 'Delivered'
  }
  ];

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    private customerService: CustomerService,
    private cookieService: CookieService,
    private creditCardService: CreditCardService,
    private userService: UserService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.loadCustomer();
    this.loadPaymentMethods()
    this.loadCustomerOrders()
  }

  loadCustomer() {
    this.authService.getUserCustomer().subscribe((data: any) => {
        console.log(data);
    });
  }


  loadCustomerOrders() {
    this.authService.getUserOrders().subscribe((data: any) => {
        console.log(data);
        this.orders = data;
    });
  }

  loadOrders() {

  }


  loadPaymentMethods() {
    this.authService.getUserPaymentMethods().subscribe((data: any) => {
      console.log('loadPaymentMethods', data);   
      console.log(data)
      this.credit_cards = data
    });
  }



  onChangeShippingAddress() {
    const dialogRef = this.dialog.open(ChangeAddressDialogComponent, {
      data: { address: this.customer.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Add database update for address
      if (result && result !== '') {
        this.customer.address = result;
        this.authService.currentCustomer.address = result;
        this.customerService.update(this.authService.currentCustomer).subscribe((data: any) => {
          console.log(data);
        });
      }

    });
  }

  onChangeEmailAddress() {
    const dialogRef = this.dialog.open(ChangeEmailDialogComponent, {
      data: { email: this.authService.currentUser.email }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Add database update for address
      if (result && result !== '') {
        this.customer.email = result;
        this.authService.currentUser.email = result;
        this.userService.update(this.authService.currentUser).subscribe((data: any) => {
          console.log(data);
        });

 
      }
    });
  }

  onChangePassword() {
    const dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
      data: { password: this.authService.currentUser.password }
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Add database update for password
      if (result && result !== '') {
        console.log(result);
        if (result.password == result.c_password) {
          // Update user in db
          this.authService.sendUpdatePasswordRequest(result).subscribe((data: any) => {
            console.log(data);
            this.authService.currentUser.password = data.data.password;
          });
        } else {
          window.alert('The passwords entered do not match.');
        }
        // this.authService.currentUser.password = result;

        // this.userService.update(this.authService.currentUser).subscribe((data: any) => {
        //   console.log(data)
        // })

 
      }
    });
  }

  onDeleteAccount(): void {
    if (window.confirm('Are you sure you want to delete your account? This cannot be undone.')) {
      
      this.userService.delete(this.authService.currentUser).subscribe(() => {
        this.router.navigateByUrl('/register');
        this.cookieService.delete('user_token');
      });
      this.authService.sendLogoutRequest();
    } else {
      return;
    }
  }

  onChangePayment() {
    console.log(this.credit_cards[0])
    const dialogRef = this.dialog.open(ChangePaymentDialogComponent, {
      data: this.credit_cards[0]
    });

    dialogRef.afterClosed().subscribe(result => {
      // TODO: Add database update for address
      if (result && result !== '') {
        console.log(result)
      
        this.creditCardService.update(result).subscribe(() => {
          this.authService.getUserPaymentMethods()
        });
        // Send payment method to database.
      }
    });
  }
}
