import type { Subscription } from "../types";

export const dummySubscriptions: Subscription[] = [
  {
    id: 1,
    serviceName: "Netflix",
    price: 1590,
    billingCycle: "monthly",
  },
  {
    id: 2,
    serviceName: "Spotify",
    price: 980,
    billingCycle: "monthly",
  },
  {
    id: 3,
    serviceName: "Amazon Prime",
    price: 5900,
    billingCycle: "yearly",
  },
  {
    id: 4,
    serviceName: "Apple Music",
    price: 1080,
    billingCycle: "monthly",
  },
  {
    id: 5,
    serviceName: "YouTube Premium",
    price: 1280,
    billingCycle: "monthly",
  },
];