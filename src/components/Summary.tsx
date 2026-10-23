import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
};

//toMonthlyAmount：月額払いでも年額払いでも、1か月あたりの支出はいくらになるかを出す。
const toMonthAmount = (subscription: Subscription) => {
  if (subscription.billingCycle === "yearly") {
    return Math.round(subscription.price / 12)
  }
  return subscription.price
};

//toYearlyAmount：月額払いでも年額払いでも、1年間あたりの支出はいくらになるかを出す。
const toYearlyAmount = (subscription: Subscription) => {
  if (subscription.billingCycle === "yearly") {
    return subscription.price
  }
  return subscription.price * 12
};

export const Summary = ({ subscriptions} : Props) => {
  const monthlyTotal = subscriptions.reduce(
    (sum, item) => sum + toMonthAmount(item),
    0
  );
  const yearlyTotal = subscriptions.reduce(
    (sum, item) => sum + toYearlyAmount(item),
    0
  );
  return (
    <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
    <p className="m-0 text-sm text-gray-500">月額合計</p>
    <p className="mb-3 mt-1 text-2xl font-bold !text-[#0d6b56]">
      ¥{monthlyTotal.toLocaleString()}
      <span className="text-sm font-medium !text-gray-500"> /月</span>
    </p>
    <p className="m-0 text-sm !text-gray-600">
      年間合計 ¥{yearlyTotal.toLocaleString()} /年
    </p>
    <p className="mb-0 mt-1 text-sm !text-gray-600">
      登録数 {subscriptions.length}
    </p>
  </section>
  )
}