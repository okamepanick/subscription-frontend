import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { Home } from "./pages/Home";
import { SubscriptionDetail } from "./pages/SubscriptionDetail";
import { SubscriptionNew } from "./pages/SubscriptionNew";
import type { Subscription } from "./types";
import { SubscriptionEdit } from "./pages/SubscriptionEdit";
import { Calendar } from "./pages/Calendar";
import { Analysis } from "./pages/Analysis";
import { BottomNav } from "./components/BottomNav";

const API_URL = "http://localhost:3000/api/subscriptions";

function App() {
  // subscriptions: 画面に出すサブスク一覧。最初は空で、APIの結果で上書きする
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // loading: APIの取得が終わるまで true。終わるまで「読み込み中」を出す
  const [loading, setLoading] = useState(true);
  // loadError: 取得に失敗したときのメッセージ。成功したら null のまま
  const [loadError, setLoadError] = useState<string | null>(null);

  // ページを開いたとき、1回だけRailsの一覧APIを呼ぶ
  useEffect(() => {
    // 画面を離れたあと、遅れて返ってきた結果で表示を書き換えないようにする
    const controller = new AbortController();

    async function loadSubscriptions() {
      try {
        // 開発用データベースのサブスク一覧をJSONでもらう
        const response = await fetch(API_URL, { signal: controller.signal });
        // 200番台以外（404や500など）は失敗として扱う
        if (!response.ok) {
          throw new Error(`一覧の取得に失敗しました (${response.status})`);
        }
        const data = (await response.json()) as Subscription[];
        // もらった配列を、画面のカードに使うデータへ入れる
        setSubscriptions(data);
      } catch (error) {
        // 画面を離れて中断しただけなら、エラー表示にはしない
        if (controller.signal.aborted) {
          return;
        }
        setLoadError(
          error instanceof Error ? error.message : "一覧の取得に失敗しました",
        );
      } finally {
        // 成功でも失敗でも、中断でなければ読み込み表示を終わらせる
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadSubscriptions();
    // この画面が消えるとき、進行中の取得を止める
    return () => controller.abort();
  }, []);

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

  // 一覧が届くまで、カードの代わりに「読み込み中」だけ出す
  if (loading) {
    return <p className="page">読み込み中...</p>;
  }

  // 取得に失敗したら、カードは出さずエラーメッセージだけ出す
  if (loadError) {
    return <p className="page">{loadError}</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home subscriptions={subscriptions} />} />
        <Route
          path="/calendar"
          element={<Calendar subscriptions={subscriptions} />}
        />
        <Route
          path="/analysis"
          element={<Analysis subscriptions={subscriptions} />}
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
      <BottomNav />
    </BrowserRouter>
  )
}

export default App