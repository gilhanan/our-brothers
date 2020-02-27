import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AnalyticsService } from 'src/app/services/analytics.service';
import { PaypalService } from 'src/app/services/paypal.service';
import { User, PayPalOrder } from 'models';
import { CreateOrder } from 'src/app/components/paypal-button/paypal-button.component';

@Component({
  selector: 'app-donate-page',
  templateUrl: './donate-page.component.html',
  styleUrls: ['./donate-page.component.scss']
})
export class DonatePageComponent implements OnInit {

  public loading = true;
  public user: User;
  public amount = '20.00';

  constructor(private authService: AuthService,
    private analyticsService: AnalyticsService,
    private paypalService: PaypalService) {
  }

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.loading = false;
      this.user = user;
    })
  }

  onCreateOrder(order: CreateOrder) {
    this.analyticsService.logEvent('PayPalCreatingOrder', {
      ammout: order.amount
    })
  }

  onApprove(order: PayPalOrder) {

    const userOrder: PayPalOrder = {
      ...order,
      userId: this.user && this.user.id
    };

    this.paypalService.captureOrder(userOrder).subscribe(() => {

      this.analyticsService.logEvent('PayPalCaptureOrderSuccess', {
        order: userOrder
      });

      alert('תודה רבה, קיבלנו את תרומתך בהצלחה');

    }, (error) => {

      this.analyticsService.logEvent('PayPalCaptureOrderFailed', {
        order: userOrder,
        error
      });

      console.error(error);

      alert('שגיאה');
    });
  }

  onCancel(data: any) {
    this.analyticsService.logEvent('PayPalOrderCanceled', data);
    console.warn(data);
  }

  onError(error: any) {
    this.analyticsService.logEvent('PayPalOrderFailed', {
      error: error.toString()
    });
    console.error(error);
    alert('שגיאה');
  }
}
