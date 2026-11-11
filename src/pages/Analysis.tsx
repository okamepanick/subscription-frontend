import { useState } from "react";
import { Summary } from "../components/Summary";
import type { Subscription } from "../types";

type Props = {
  subscriptions: Subscription[];
};

type SortOrder = "high" | "low" | "name";

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
  const [sortOrder, setSortOrder] = useState<SortOrder>("high");
  const ranked = [...subscriptions].sort((a, b) => {
    if (sortOrder === "low") {
      return toMonthAmount(a) - toMonthAmount(b);
    }
    if (sortOrder === "name") {
      return a.serviceName.localeCompare(b.serviceName, "ja");
    }
    return toMonthAmount(b) - toMonthAmount(a);
  });
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
    <h1 className="mb-5 text-3xl font-bold tracking-[0.14em]">
      分<span className="!text-[#0d6b56]">析</span>
    </h1>
    <Summary subscriptions={subscriptions} />
    <section className="mb-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mt-0 mb-3 text-base font-semibold">月額 / 年額の割合</h2>
      <p className="m-0 text-sm !text-gray-600">月額 {monthlyShare}%</p>
      <p className="mt-1 mb-3 text-sm !text-gray-600">年額 {yearlyShare}%</p>
      <div className="ratio-track">
        <span
          className="ratio-fill is-monthly"
          style={{ width: `${monthlyShare}%` }}
        />
        <span
          className="ratio-fill is-yearly"
          style={{ width: `${yearlyShare}%` }}
        />
      </div>
    </section>
    <h2 className="mb-3 text-base font-semibold">サービス別の支出</h2>
    <select
      className="mb-4 block w-full rounded-xl border border-gray-200 bg-white px-3 py-2 !text-[#1c1c1a]"
      value={sortOrder}
      onChange={(event) => setSortOrder(event.target.value as SortOrder)}
    >
      <option value="high">月額が高い順</option>
      <option value="low">月額が低い順</option>
      <option value="name">名前順</option>
    </select>
    {ranked.map((subscription) => {
      const monthly = toMonthAmount(subscription);
      const width = Math.round((monthly / maxMonthly) * 100);
      return (
        <article
          key={subscription.id}
          className="mb-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h3 className="mt-0 mb-1 text-base font-semibold">
            {subscription.serviceName}
          </h3>
          <p className="m-0 text-lg font-bold">
            ¥{monthly.toLocaleString()} / 月
          </p>
          <div className="bar-track">
            <span className="bar-fill" style={{ width: `${width}%` }} />
          </div>
        </article>
      );
    })}
  </div>
  );
};