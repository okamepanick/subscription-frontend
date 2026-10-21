import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { dummySubscriptions } from "./data/dummySubscriptions";
import { Home } from "./pages/Home";
import { SubscriptionDetail } from "./pages/SubscriptionDetail";
import { SubscriptionNew } from "./pages/SubscriptionNew";
import type { Subscription } from "./types";
import { SubscriptionEdit } from "./pages/SubscriptionEdit";
import { Calendar } from "./pages/Calendar";

function App() {
  const [subscriptions, setSubscriptions] = useState(dummySubscriptions);

  const addSubscription = (input: Omit<Subscription, "id">) => {
    const nextId =
      subscriptions.length === 0
        ? 1
        : Math.max(...subscriptions.map((item) => item.id)) + 1

    setSubscriptions([
      ...subscriptions,
      {
        ...input,
        id: nextId,
      },
    ]);
  };

  const updateSubscription = (
    id: number,
    input: Omit<Subscription, "id">
  ) => {
    setSubscriptions(
      subscriptions.map((item) =>
        item.id === id ? { ...input, id } : item
      )
    );
  };

  const deleteSubscription = (id: number) => {
    setSubscriptions(
      subscriptions.filter((item) => item.id !== id)
    );
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home subscriptions={subscriptions} />} />
        <Route
          path="/calendar"
          element={<Calendar subscriptions={subscriptions} />}
        />

        <Route path="/subscriptions/new" element={<SubscriptionNew onAdd={addSubscription} />} />

        <Route path="/subscriptions/:id/edit" element={<SubscriptionEdit subscriptions={subscriptions} onUpdate={updateSubscription}/>}/>
        <Route
          path="/subscriptions/:id"
          element={
            <SubscriptionDetail
              subscriptions={subscriptions}
              onDelete={deleteSubscription}
            />
          }
        />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App