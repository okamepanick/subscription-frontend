const LIFF_URL = `https://liff.line.me/${import.meta.env.VITE_LIFF_ID}`;

const menuButtons = [
  "サブスク登録",
  "サブスク編集",
  "使い方",
  "サブスク一覧",
  "サブスク削除",
  "アプリを開く",
];

export const Landing = () => {
  return (
    <div className="page">
      <p className="m-0 text-xs font-medium tracking-[0.2em] !text-[#0d6b56]">
        SUBSCRIPTION
      </p>
      <h1 className="mt-1 mb-5 text-3xl font-bold">
        Sub<span className="!text-[#0d6b56]">Check</span>
      </h1>
      <p className="mb-3 text-sm leading-7">
        LINEの中だけで使えるサブスク管理アプリです。
        LINEがあれば、別の会員登録は不要です。
      </p>
      <p className="mb-3 text-sm leading-7">
        主な機能は、サブスクの登録、一覧の確認、編集、削除です。請求日が近づくと、LINEに通知が届きます。
      </p>
      <p className="mb-6 text-sm leading-7">
        登録、一覧、編集、削除は、リッチメニューから行えます。
      </p>
      <section className="mb-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mt-0 mb-3 text-base font-semibold">リッチメニュー</h2>
        <ul className="m-0 grid grid-cols-2 gap-2 p-0">
          {menuButtons.map((label) => (
            <li
              key={label}
              className="list-none rounded-xl bg-[#f4f6f5] px-3 py-2 text-center text-sm"
            >
              {label}
            </li>
          ))}
        </ul>
      </section>
      <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mt-0 mb-3 text-base font-semibold">2つの使い方</h2>
        <p className="mb-3 text-sm leading-7">
          LINEのトークだけで十分なら、サブスク登録、サブスク編集、サブスク一覧、サブスク削除を使います。
        </p>
        <p className="m-0 text-sm leading-7">
          画面で請求日や支出を見たい人は、アプリを開くボタンから確認します。
        </p>
      </section>
      <a
        href={LIFF_URL}
        className="block rounded-xl bg-[#0d6b56] px-4 py-3 text-center !text-white no-underline"
      >
        LINEと連携したサブスク管理アプリはこちら
      </a>
    </div>
  );
};
