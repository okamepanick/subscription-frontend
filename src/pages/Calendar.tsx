import { useState } from "react";
import type { Subscription } from "../types";
import { SubscriptionCard } from "../components/SubscriptionCard";

type Props = {
  subscriptions: Subscription[];
};

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export const Calendar = ({ subscriptions }: Props) => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [monthIndex, setMonthIndex] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState("");

  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  const cells: Array<number | null> = [];
  for (let i = 0; i < firstDay; i += 1) {
    cells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(day);
  }

  const selectedBillings = subscriptions.filter(
    (item) => item.nextBillingDate === selectedDate
  );

  const shiftMonth = (offset: number) => {
    const next = new Date(year, monthIndex + offset, 1);
    setYear(next.getFullYear());
    setMonthIndex(next.getMonth());
    setSelectedDate("");
  };

  return (
    <div className="page">
      <h1>カレンダー</h1>
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="calendar-toolbar">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="!m-0 !bg-white !text-[#0d6b56]"
          >
            ＜
          </button>
          <p className="m-0 font-semibold">
            {year}年{monthIndex + 1}月
          </p>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="!m-0 !bg-white !text-[#0d6b56]"
          >
            ＞
          </button>
        </div>
        <div className="calendar-weekdays">
          {WEEKDAYS.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="calendar-grid">
          {cells.map((day, index) => {
            if (day === null) {
              return <span key={index} className="calendar-cell" />;
            }

            const month = String(monthIndex + 1).padStart(2, "0");
            const date = String(day).padStart(2, "0");
            const iso = `${year}-${month}-${date}`;
            const hasBilling = subscriptions.some(
              (item) => item.nextBillingDate === iso
            );
            const isSelected = selectedDate === iso;

            return (
              <button
                key={index}
                type="button"
                className={`!m-0 h-10 w-full rounded-full p-0 text-sm ${
                  hasBilling
                  ? "font-bold !bg-[#d8eee8] !text-[#0d6b56]"
                  : "!bg-transparent !text-[#1c1c1a]"
                } ${isSelected ? "ring-2 ring-[#0d6b56]" : ""}`}
                onClick={() => setSelectedDate(iso)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>
      {selectedDate ? (
        <div className="mt-4">
          <h2>{selectedDate} の請求</h2>
          {selectedBillings.length === 0 ? (
            <p>この日の請求はありません</p>
          ) : (
            selectedBillings.map((subscription) => (
              <SubscriptionCard
                key={subscription.id}
                subscription={subscription}
              />
            ))
          )}
        </div>
      ) : (
        <p className="mt-4">日付を選ぶと、その日の請求が出ます</p>
      )}
    </div>
  );
};