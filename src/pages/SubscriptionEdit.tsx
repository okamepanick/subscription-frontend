import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { BillingCycle, Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
  onUpdate: (id: number, subscription: Omit<Subscription, "id" >) => void;
};

export const SubscriptionEdit = ({subscriptions, onUpdate}: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const subscription = subscriptions.find((item) => item.id === Number(id));
  const [serviceName, setServiceName] = useState(subscription?.serviceName ?? "");
  const [price, setPrice] = useState(subscription ? String(subscription.price) : "");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>(
    subscription?.billingCycle ?? "monthly"
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onUpdate(Number(id), {
      serviceName,
      price: Number(price),
      billingCycle,
    });
    navigate(`/subscriptions/${id}`);
  };

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
      <Link to="/">ホームへ戻る</Link>
      <h1>サブスクを編集</h1>
      <form onSubmit={handleSubmit}>
        <label>
          サービス名
          <input
            value={serviceName}
            onChange={(event) => setServiceName(event.target.value)}
            required
          />
        </label>
        <label>
          料金
          <input
            type="number"
            min={1}
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            required
          />
        </label>
        <label>
          請求周期
          <select
            value={billingCycle}
            onChange={(event) =>
              setBillingCycle(event.target.value as BillingCycle)
            }
          >
            <option value="monthly">月額</option>
            <option value="yearly">年額</option>
          </select>
        </label>
        <button type="submit">保存</button>
      </form>
    </div>
  );
};
