import type { Subscription } from "../types";

export const dummySubscriptions: Subscription[] = [
  {
    id: 1,
    serviceName: "Netflix",
    price: 1590,
    billingCycle: "monthly",
    startDate: "2025-03-01",
    nextBillingDate: "2026-09-15",
    paymentMethod: "credit_card",
  },
  {
    id: 2,
    serviceName: "Spotify",
    price: 980,
    billingCycle: "monthly",
    startDate: "2024-11-20",
    nextBillingDate: "2026-09-10",
    paymentMethod: "apple_pay",
  },
  {
    id: 3,
    serviceName: "Amazon Prime",
    price: 5900,
    billingCycle: "yearly",
    startDate: "2025-11-01",
    nextBillingDate: "2026-11-01",
    paymentMethod: "credit_card",
  },
  {
    id: 4,
    serviceName: "Apple Music",
    price: 1080,
    billingCycle: "monthly",
    startDate: "2025-06-20",
    nextBillingDate: "2026-09-20",
    paymentMethod: "apple_pay",
  },
  {
    id: 5,
    serviceName: "YouTube Premium",
    price: 1280,
    billingCycle: "monthly",
    startDate: "2025-01-12",
    nextBillingDate: "2026-09-12",
    paymentMethod: "google_pay",
  },
];
