import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import type { BillingCycle, PaymentMethod, Subscription } from "../types";

type Props = {
  onAdd: (subscription: Omit<Subscription, "id">) => void;
};

export const SubscriptionNew = ({onAdd}: Props) => {
  const navigate = useNavigate();
  const [serviceName, setServiceName] = useState("");
  const [price, setPrice] = useState("");
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const [startDate, setStartDate] = useState("");
  const [nextBillingDate, setNextBillingDate] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAdd({
      serviceName,
      price: Number(price),
      billingCycle,
      startDate,
      nextBillingDate,
      paymentMethod,
    });
    navigate("/");
  };

  return (
    <div className="page">
      <button type="button" onClick={() => navigate("/")}>
        ホームへ戻る
      </button>
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
