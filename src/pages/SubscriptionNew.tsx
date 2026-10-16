import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import type { BillingCycle, Subscription } from "../types";

type Props = {
  onAdd: (subscription: Omit<Subscription, "id">) => void;
};

export const SubscriptionNew = ({onAdd}: Props) => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      serviceName,
      price: Number(price),
      billingCycle,
    });
    navigate("/");
  };

  return (
    <div className="page">
      <Link to="/">ホームへ戻る</Link>
      <h1>サブスクを追加</h1>
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
