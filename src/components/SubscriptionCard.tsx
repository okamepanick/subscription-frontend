import { Link } from "react-router";
import type { Subscription } from "../types";

type Props = {
  subscription: Subscription;
};

export const SubscriptionCard = ({ subscription }: Props) => {
  return (
    <Link
      to={`/subscriptions/${subscription.id}`}
      className="mb-3 block rounded-2xl border border-gray-200 bg-white p-5 !text-[#1c1c1a] no-underline shadow-sm"
    >
      <article>
        <h2 className="mb-2 mt-0 text-lg font-semibold">
          {subscription.serviceName}
        </h2>
        <p className="m-0 text-lg font-bold">
          ¥{subscription.price.toString()} /{" "}
          {subscription.billingCycle === "monthly" ? "月" : "年"}
        </p>
      </article>
    </Link>
  );
};
