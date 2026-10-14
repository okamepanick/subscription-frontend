import { Link } from "react-router";
import type { Subscription } from "../types";

type Props = {
  subscription: Subscription;
};

export const SubscriptionCard = ({subscription}: Props) => {
  return (
    <Link to={`/subscriptions/${subscription.id}`} className="card-link" >
      <article className="card">
        <h2>{subscription.serviceName}</h2>
        <p>
          ¥{subscription.price.toString()} / {subscription.billingCycle === "monthly" ? "月" : "年"}
        </p>
      </article>
    </Link>
  );
};