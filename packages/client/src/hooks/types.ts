import { CoreOptions } from '@adyen/adyen-web/dist/types/core/types';
import { PaymentAmount } from '@adyen/adyen-web/dist/types/types';

export type InitializationRequest = {
  merchantAccount: string;
  amount: PaymentAmount;
  returnUrl: string;
  reference: string;
  expiresAt?: Date;
  countryCode?: string;
  shopperLocale?: string;
  shopperEmail?: string;
  shopperIP?: string;
  shopperReference?: string;
};

export interface EditableCheckoutConfigFields extends CoreOptions {
  redirectResult?: {
    redirectResult: string;
    redirectSessionId: string;
  };
  showPayButton?: boolean;
}

export interface CheckoutConfig extends EditableCheckoutConfigFields {
  onChange?: (state: any, element: any) => void;
  onValid?: (state: any, element: any) => void;
  onSubmit?: (state: any, element: any) => void;
  onAdditionalDetails?: (state: any, element: any) => void;
  onError?: (error: any, element?: any) => void;
  onPaymentCompleted?: (result: any, element: any) => void;
}
