import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router";
import type { BillingCycle, PaymentMethod, Subscription } from "../types";

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
  const [startDate, setStartDate] = useState(subscription?.startDate ?? "");
  const [nextBillingDate, setNextBillingDate] = useState(
    subscription?.nextBillingDate ?? ""
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    subscription?.paymentMethod ?? "credit_card"
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onUpdate(Number(id), {
      serviceName,
      price: Number(price),
      billingCycle,
      startDate,
      nextBillingDate,
      paymentMethod,
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
        <label>
          契約開始日
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            required
          />
        </label>
        <label>
          次回請求日
          <input
            type="date"
            value={nextBillingDate}
            onChange={(event) => setNextBillingDate(event.target.value)}
            required
          />
        </label>
        <label>
          支払い方法
          <select
            value={paymentMethod}
            onChange={(event) =>
              setPaymentMethod(event.target.value as PaymentMethod)
            }
          >
            <option value="credit_card">クレジットカード</option>
            <option value="debit_card">デビットカード</option>
            <option value="apple_pay">Apple Pay</option>
            <option value="google_pay">Google Pay</option>
            <option value="carrier">キャリア決済</option>
            <option value="other">その他</option>
          </select>
        </label>
        <button type="submit">保存</button>
      </form>
    </div>
  );
};
