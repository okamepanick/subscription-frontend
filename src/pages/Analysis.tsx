import { Summary } from "../components/Summary";
import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
};

const toMonthAmount = (subscription: Subscription) => {
  if (subscription.billingCycle === "yearly") {
    return Math.round(subscription.price / 12);
  }
  return subscription.price;
};

const toYearlyAmount = (subscription: Subscription) => {
  if (subscription.billingCycle === "yearly") {
    return subscription.price;
  }
  return subscription.price * 12;
};

export const Analysis = ({ subscriptions }: Props) => {
  const ranked = [...subscriptions].sort(
    (a, b) => toMonthAmount(b) - toMonthAmount(a)
  );
  const maxMonthly = Math.max(...ranked.map((item) => toMonthAmount(item)), 1);

  const monthlyCycleTotal = subscriptions
    .filter((item) => item.billingCycle === "monthly")
    .reduce((sum, item) => sum + toYearlyAmount(item), 0);
  const yearlyCycleTotal = subscriptions
    .filter((item) => item.billingCycle === "yearly")
    .reduce((sum, item) => sum + toYearlyAmount(item), 0);
  const cycleTotal = monthlyCycleTotal + yearlyCycleTotal;
  const monthlyShare =
    cycleTotal === 0 ? 0 : Math.round((monthlyCycleTotal / cycleTotal) * 100);
  const yearlyShare = cycleTotal === 0 ? 0 : 100 - monthlyShare;

  return (
    <div className="page">
      <h1>分析</h1>
      <Summary subscriptions={subscriptions} />

      <h2>月額 / 年額の割合</h2>
      <p>月額 {monthlyShare}%</p>
      <p>年額 {yearlyShare}%</p>
      <div className="ratio-track">
        <span className="ratio-fill is-monthly" style={{ width: `${monthlyShare}%` }} />
        <span className="ratio-fill is-yearly" style={{ width: `${yearlyShare}%` }} />
      </div>

      <h2>サービス別の支出</h2>
      {ranked.map((subscription) => {
        const monthly = toMonthAmount(subscription);
        const width = Math.round((monthly / maxMonthly) * 100);

        return (
          <article key={subscription.id} className="card">
            <h3>{subscription.serviceName}</h3>
            <p>¥{monthly.toLocaleString()} / 月</p>
            <div className="bar-track">
              <span className="bar-fill" style={{ width: `${width}%` }} />
            </div>
          </article>
        );
      })}
    </div>
  );
};