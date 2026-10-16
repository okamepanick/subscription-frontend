import { Link } from "react-router";
import { SubscriptionCard } from "../components/SubscriptionCard";
import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
};

export const Home = ({subscriptions}: Props) => {
  return (
    <div className='page'>
      <h1>SubCheck</h1>
      <Link to="/subscriptions/new">追加</Link>
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
        />
      ))}
    </div>
  );
};

