import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate, useParams } from "react-router";
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
        <button type="button" onClick={() => navigate("/")}>
          ホームへ戻る
        </button>
      </div>
    );
  }

  const fieldClass = "mb-4 block text-sm !text-gray-600";
  const inputClass =
  "mt-1 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2 !text-[#1c1c1a]";


  return (
    <div className="page">
    <button
      type="button"
      onClick={() => navigate("/")}
      className="mb-4 !bg-transparent !px-0 !text-sm !text-[#0d6b56]"
    >
      ← ホームへ戻る
    </button>
    <h1>サブスクを編集</h1>
    <form onSubmit={handleSubmit}>
      <label className={fieldClass}>
        サービス名
        <input
          className={inputClass}
          value={serviceName}
          onChange={(event) => setServiceName(event.target.value)}
          required
        />
      </label>
      <label className={fieldClass}>
        料金
        <input
          className={inputClass}
          type="number"
          min={1}
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />
      </label>
      <label className={fieldClass}>
        請求周期
        <select
          className={inputClass}
          value={billingCycle}
          onChange={(event) =>
            setBillingCycle(event.target.value as BillingCycle)
          }
        >
          <option value="monthly">月額</option>
          <option value="yearly">年額</option>
        </select>
      </label>
      <label className={fieldClass}>
        契約開始日
        <input
          className={inputClass}
          type="date"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />
      </label>
      <label className={fieldClass}>
        次回請求日
        <input
          className={inputClass}
          type="date"
          value={nextBillingDate}
          onChange={(event) => setNextBillingDate(event.target.value)}
          required
        />
      </label>
      <label className={fieldClass}>
        支払い方法
        <select
          className={inputClass}
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
      <button
        type="submit"
        className="mt-2 w-full rounded-xl !bg-[#0d6b56] py-3 !text-white"
      >
        保存
      </button>
    </form>
  </div>
  );
};
