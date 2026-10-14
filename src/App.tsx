
import "./App.css";
import { SubscriptionCard } from "./components/SubscriptionCard";
import type { Subscription } from "./types";

const dummySubscription: Subscription = {
  id: 1,
  serviceName: "Netflix",
  price: 1590,
  billingCycle: "monthly",
};


function App() {
  return (
    <div className='page'>
      <h1>SubCheck</h1>
      <SubscriptionCard subscription={dummySubscription} />
    </div>
  )
}

export default App