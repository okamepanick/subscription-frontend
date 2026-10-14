import { SubscriptionCard } from "../components/SubscriptionCard";
import { dummySubscriptions } from "../data/dummySubscriptions";

export const Home = () => {
  return (
    <div className='page'>
      <h1>SubCheck</h1>
      {dummySubscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription.id}
          subscription={subscription}
        />
      ))}
    </div>
  );
};

