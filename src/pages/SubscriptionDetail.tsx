import { useParams, Link, useNavigate } from "react-router";
import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
  onDelete: (id: number) => void;
};

export const SubscriptionDetail = ({subscriptions, onDelete}: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
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

      <button
        type="button"
        onClick={() => {
          const ok = window.confirm(
            `${subscription.serviceName} を削除しますか？`
          );
          if (!ok) {
            return;
          }
          onDelete(subscription.id);
          navigate("/");
        }}
      >
        削除
      </button>
    </div>
  );
};