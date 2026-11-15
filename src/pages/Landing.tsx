const LIFF_URL = `https://liff.line.me/${import.meta.env.VITE_LIFF_ID}`;

export const Landing = () => {
  return (
    <div className="page">
      <p className="m-0 text-xs font-medium tracking-[0.2em] !text-[#0d6b56]">
        SUBSCRIPTION
      </p>
      <h1 className="mt-1 mb-5 text-3xl font-bold">
        Sub<span className="!text-[#0d6b56]">Check</span>
      </h1>
      <p className="mb-6 text-sm leading-7">
        LINEと連携して、サブスクの登録、請求日、支出を確認できるアプリです。
      </p>
      <a
        href={LIFF_URL}
        className="block rounded-xl bg-[#0d6b56] px-4 py-3 text-center !text-white no-underline"
      >
        LINEと連携したサブスク管理アプリはこちら
      </a>
    </div>
  );
};