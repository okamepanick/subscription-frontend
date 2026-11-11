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
import { Guide } from "./pages/Guide";

const API_URL =
  import.meta.env.VITE_API_URL ??
  "https://subcheck-okp9.onrender.com/api/subscriptions";

const LIFF_ID = import.meta.env.VITE_LIFF_ID;

declare global {
  interface Window {
    liff: {
      init: (config: { liffId: string }) => Promise<void>;
      getIDToken: () => string | null;
    };
  }
}

async function lineAuthHeaders(): Promise<HeadersInit> {
  const idToken = window.liff.getIDToken();
  if (!idToken) {
    throw new Error("LINEの画面から開いてください");
  }

  return { Authorization: `Bearer ${idToken}` };
}

function App() {
  // subscriptions: 画面に出すサブスク一覧。最初は空で、APIの結果で上書きする
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  // loading: APIの取得が終わるまで true。終わるまで「読み込み中」を出す
  const [loading, setLoading] = useState(true);
  // loadError: 取得に失敗したときのメッセージ。成功したら null のまま
  const [loadError, setLoadError] = useState<string | null>(null);

  // ページを開いたとき、1回だけRailsの一覧APIを呼ぶ
  useEffect(() => {
  const controller = new AbortController();

  async function loadSubscriptions() {
    try {
      if (!LIFF_ID) {
        throw new Error("LIFF IDが設定されていません");
      }
      await window.liff.init({ liffId: LIFF_ID });
      const headers = await lineAuthHeaders();
      const response = await fetch(API_URL, {
        headers,
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? `一覧の取得に失敗しました (${response.status})`);
      }
      setSubscriptions(data);
    } catch (error) {
      console.error("LIFFまたは一覧取得エラー:", error);
      if (controller.signal.aborted) {
        return;
      }
      setLoadError(
        error instanceof Error ? error.message : "LINEの画面から開き直してください",
      );
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

    void loadSubscriptions();
    return () => controller.abort();
  }, []);

  const addSubscription = async (input: Omit<Subscription, "id">) => {
  const headers = await lineAuthHeaders();
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(input),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error ?? "登録に失敗しました");
  }

  setSubscriptions((current) => [...current, data]);
  };

  const updateSubscription = async (
    id: number,
    input: Omit<Subscription, "id">
  ) => {
    const headers = await lineAuthHeaders();
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error ?? "編集に失敗しました");
    }

    setSubscriptions((current) =>
      current.map((item) => (item.id === id ? data : item))
    );
  };

  const deleteSubscription = async (id: number) => {
    const headers = await lineAuthHeaders();
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error ?? "削除に失敗しました");
    }

  setSubscriptions((current) => current.filter((item) => item.id !== id));
};

  const isNewPage = window.location.pathname === "/subscriptions/new";
  const isGuidePage = window.location.pathname === "/guide";
  if (isNewPage && loading) {
  return <p style={{ padding: 20 }}>Reactは動いています。読み込み中...</p>;
}

  // 一覧が届くまで、カードの代わりに「読み込み中」だけ出す。登録画面と使い方は一覧を待たない
  if (loading && !isNewPage && !isGuidePage) {
    return <p className="page">読み込み中...</p>;
  }

  // 取得に失敗したら、カードは出さずエラーメッセージだけ出す。登録画面と使い方はエラーでも開く
  if (loadError && !isNewPage && !isGuidePage) {
    return <p className="page">{loadError}</p>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home subscriptions={subscriptions} />} />
        <Route path="/guide" element={<Guide />} />
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
      {!isGuidePage && <BottomNav />}
    </BrowserRouter>
  )
}

export default App