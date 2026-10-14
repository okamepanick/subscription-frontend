export type BillingCycle = "monthly" | "yearly";

export type Subscription = {
  id: number;
  serviceName: string;
  price: number;
  billingCycle: BillingCycle;
};
