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
  onDelete: (id: number) => Promise<void>;
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
    <button
      type="button"
      onClick={() => navigate("/")}
      className="mb-4 !bg-transparent !px-0 !text-sm !text-[#0d6b56]"
    >
      ← ホームへ戻る
    </button>
    <h1>{subscription.serviceName}</h1>
    <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="m-0 text-sm text-gray-500">料金</p>
      <p className="mb-4 mt-1 text-2xl font-bold !text-[#0d6b56]">
        ¥{subscription.price.toLocaleString()}
        <span className="text-sm font-medium !text-gray-500">
          {" "}
          / {subscription.billingCycle === "monthly" ? "月" : "年"}
        </span>
      </p>
      <p className="m-0 text-sm !text-gray-600">
        契約開始日 {subscription.startDate}
      </p>
      <p className="mt-2 mb-0 text-sm !text-gray-600">
        次回請求日 {subscription.nextBillingDate}
      </p>
      <p className="mt-2 mb-0 text-sm !text-gray-600">
        支払い方法 {paymentMethodLabels[subscription.paymentMethod]}
      </p>
    </section>
    <Link
      to={`/subscriptions/${subscription.id}/edit`}
      className="mb-3 block rounded-xl bg-[#0d6b56] px-4 py-3 text-center !text-white no-underline"
    >
      編集
    </Link>
    <button
      type="button"
      onClick={async () => {
        const ok = window.confirm(
          `${subscription.serviceName} を削除しますか？`
        );
        if (!ok) {
          return;
        }
        try {
          await onDelete(subscription.id);
          navigate("/");
        } catch (error) {
          alert(error instanceof Error ? error.message : "削除に失敗しました");
        }
      }}
      className="w-full rounded-xl !bg-white !text-red-600"
    >
      削除
    </button>
  </div>
  );
};