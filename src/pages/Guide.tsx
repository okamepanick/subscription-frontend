const guides = [
  {
    title: "サブスク登録",
    body: "登録フォームが開きます。サービス名、料金、請求日を入力して保存します。",
  },
  {
    title: "サブスク編集",
    body: "トークに登録中のサブスクが出ます。選ぶと、編集フォームが開きます。",
  },
  {
    title: "使い方",
    body: "この画面が開きます。リッチメニューの各ボタンでできることを確認できます。",
  },
  {
    title: "サブスク一覧",
    body: "トークに、登録中のサブスクが届きます。",
  },
  {
    title: "サブスク削除",
    body: "トークで削除するサブスクを選びます。選んだサブスクが削除されます。",
  },
  {
    title: "アプリを開く",
    body: "一覧、登録、編集、削除、カレンダー、支出分析ができるアプリが開きます。",
  },
];

export const Guide = () => {
  return (
    <div className="page">
      <h1 className="mb-5 text-3xl font-bold tracking-[0.14em]">
        使い<span className="!text-[#0d6b56]">方</span>
      </h1>
      {guides.map((item) => (
        <section
          key={item.title}
          className="mb-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <h2 className="mt-0 mb-2 text-base font-semibold">{item.title}</h2>
          <p className="m-0 text-sm !text-gray-600">{item.body}</p>
        </section>
      ))}
    </div>
  );
};
