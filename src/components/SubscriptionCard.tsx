import type { Subscription } from "../types";

type Props = {
  subscription: Subscription;
};

export const SubscriptionCard = ({subscription}: Props) => {
  return (
    <article className="card">
      <h2>{subscription.serviceName}</h2>
      <p>
        ¥{subscription.price.toString()} / {subscription.billingCycle === "monthly" ? "月" : "年"}
      </p>
    </article>
  );
};