import { Component, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { PayPalDonation } from 'models';

declare var paypal: any;

export interface CreateDonation {
  amount: string;
}

interface PayPalApproveData {
  orderID: string;
  payerID: string;
  facilitatorAccessToken: string;
}

@Component({
  selector: 'app-paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrls: ['./paypal-button.component.scss']
})
export class PaypalButtonComponent implements AfterViewInit {
  @Input() amount: string;
  @Output() createDonation = new EventEmitter<CreateDonation>();
  @Output() approve = new EventEmitter<PayPalDonation>();
  @Output() cancel = new EventEmitter<any>();
  @Output() error = new EventEmitter<any>();

  private donationAmount: string;

  ngAfterViewInit(): void {
    if (paypal) {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            this.donationAmount = this.amount;
            this.createDonation.emit({ amount: this.donationAmount });

            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    value: this.donationAmount,
                    currency_code: 'ILS'
                  }
                }
              ]
            });
          },
          onApprove: (data: PayPalApproveData, actions) => {
            this.approve.emit({
              payerId: data.payerID,
              donationId: data.orderID,
              amount: this.donationAmount
            });
          },
          onCancel: data => {
            this.cancel.emit(data);
          },
          onError: error => {
            this.error.emit(error);
          }
        })
        .render('#paypal-button-container');
    }
  }
}
