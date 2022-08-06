import { Component } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { CartState } from './store/cart.state';
import { ICartItem } from './models/cart-item.model';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from './services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { RouterModule, Routes, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'suburban-outfitters';

  @Select(CartState.itemCount) cartItemCount$: Observable<number>;

  constructor(private store: Store, private cookieService: CookieService, private router: Router, public authService: AuthService) {
    this.authService.currentUserSubject.subscribe((data) => {
      console.log('authService.currentUser >>>>> ', data);
      this.authService.getUserCustomer().subscribe((data: any) => {
        console.log('authService.currentCustomer >>>>> ', data);
      });
    });

    if (!this.authService.currentUser && cookieService.check('user_token')) {
      this.authService.getUserProfile().subscribe((data: any) => {
        console.log('did load profile with cookie', data);
      });

      this.authService.getUserCustomer().subscribe((data: any) => {
        console.log('did load customer data');
      });

      this.authService.getUserPaymentMethods().subscribe((data: any) => {
        console.log('did load payment method data');
      });
    }
  }

  logout() {
    console.log('logout');
    this.router.navigateByUrl('/login');
    this.cookieService.delete('user_token');
    this.authService.sendLogoutRequest();
  }
}
