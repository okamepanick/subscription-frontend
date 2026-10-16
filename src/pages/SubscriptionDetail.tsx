import { useParams, Link } from "react-router";
import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
};

export const SubscriptionDetail = ({subscriptions}: Props) => {
  const { id } = useParams();
  const subscription = subscriptions.find(
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
      <Link to={`/subscriptions/${subscription.id}/edit`}>編集</Link>
    </div>
  );
};