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
    <section>
      <p>月額合計 ¥{monthlyTotal.toLocaleString()} /月</p>
      <p>年間合計 ¥{yearlyTotal.toLocaleString()} /年</p>
      <p>登録数 {subscriptions.length}</p>
    </section>
  )
}