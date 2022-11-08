export default function Home() {
  return (
    <div className="h-[calc(100vh-72px)] w-full  flex flex-col justify-center items-center">
      <span className="text-4xl text-center font-semibold">
        Now managing your{" "}
        <span className="text-blue-600 font-bold">Expenses</span> becomes
        <br /> really easy!
      </span>
      <br />
      <span className="bg-slate-50 px-4 rounded-2xl py-1 text-slate-600 text-center text-xl shadow-[0_2px_10px_#ddd]">
        Let us help you to manage your expenses
      </span>
    </div>
  );
}
