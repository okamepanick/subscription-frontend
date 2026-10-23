import { Link } from "react-router";
import { SubscriptionCard } from "../components/SubscriptionCard";
import type { Subscription } from "../types";
import { Summary } from "../components/Summary";

type Props = {
  subscriptions: Subscription[];
};

export const Home = ({subscriptions}: Props) => {
  return (
    <div className='page'>
      <header className="mb-5">
        <p className="m-0 text-xs font-medium tracking-[0.2em] !text-[#0d6b56]">
          SUBSCRIPTION
        </p>
        <h1 className="mt-1 mb-0 text-3xl font-bold">
          Sub<span className="!text-[#0d6b56]">Check</span>
        </h1>
      </header>
      <Summary subscriptions={subscriptions} />
      <Link
        to="/subscriptions/new"
        className="mb-4 inline-block rounded-xl bg-[#0d6b56] px-4 py-2 !text-white text-white no-underline"
      >
        追加
      </Link>
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
        />
      ))}
    </div>
  );
};

