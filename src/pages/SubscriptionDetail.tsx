import { useParams, Link, useNavigate } from "react-router";
import type { PaymentMethod, Subscription } from "../types";

const paymentMethodLabels: Record<PaymentMethod, string> = {
  credit_card: "クレジットカード",
  debit_card: "デビットカード",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  carrier: "キャリア決済",
  other: "その他",
};

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
      <button type="button" onClick={() => navigate("/")}>
        ← ホームへ戻る
      </button>
    </div>
    );
  }

  return (
    <div className="page">
      <button type="button" onClick={() => navigate("/")}>
        ホームへ戻る
      </button>
      <h1>{subscription.serviceName}</h1>
      <p>
        ¥{subscription.price.toLocaleString()} /{" "}
        {subscription.billingCycle === "monthly" ? "月" : "年"}
      </p>
      <p>契約開始日 {subscription.startDate}</p>
      <p>次回請求日 {subscription.nextBillingDate}</p>
      <p>支払い方法 {paymentMethodLabels[subscription.paymentMethod]}</p>
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