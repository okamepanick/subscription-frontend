import { useParams, Link } from "react-router";
import { dummySubscriptions } from "../data/dummySubscriptions";

export const SubscriptionDetail = () => {
  const { id } = useParams();
  const subscription = dummySubscriptions.find(
    (item) => item.id === Number(id)
  );

  if (!subscription) {
    return (
      <div className="page">
      <p>サブスクが見つかりません</p>
      <Link to="/">ホームへ戻る</Link>
    </div>
    );
  }

  return (
    <div className="page">
      <Link to="/">← ホームへ戻る</Link>
      <h1>{subscription.serviceName}</h1>
      <p>
        ¥{subscription.price.toLocaleString()} /{" "}
        {subscription.billingCycle === "monthly" ? "月" : "年"}
      </p>
    </div>
  );
};