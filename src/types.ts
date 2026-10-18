export type BillingCycle = "monthly" | "yearly";

export type PaymentMethod =
  | "credit_card"
  | "debit_card"
  | "apple_pay"
  | "google_pay"
  | "carrier"
  | "other";

export type Subscription = {
  id: number;
  serviceName: string;
  price: number;
  billingCycle: BillingCycle;
  startDate: string;
  nextBillingDate: string;
  paymentMethod: PaymentMethod;
};
