import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-neutral-slate-100 p-1.5">
      <div className="h-150 w-220 rounded-2xl flex overflow-hidden bg-neutral-white">
        <div className="h-full w-1/2 p-6">
          <div className="flex w-full justify-between items-center">
            <p className="font-bold text-[20px]">Mortgage Calculator</p>
            <p className="text-gray-500 underline text-sm">Clear All</p>
          </div>
          <div className="w-full flex flex-col gap-2 mt-8 group">
            <p className="text-gray-500 text-sm">Mortgage Amount</p>
            <div className="flex border-1 cursor-pointer border-gray-400 overflow-hidden rounded-md focus-within:border-primary-lime hover:border-primary-lime">
              <label
                for="amount"
                className="w-12 h-12 flex justify-center items-center font-bold bg-neutral-slate-100 text-[20px] text-gray-600 hover-without group-hover:bg-primary-lime group-focus-within:bg-primary-lime cursor-pointer"
              >
                £
              </label>
              <input
                type="text"
                name="amount"
                id="amount"
                className="w-full border-none focus:outline-none cursor-pointer"
              />
            </div>
          </div>
          <div className="w-full flex gap-2 mt-6">
            <div className="flex flex-col group gap-2">
              <p className="text-gray-500 text-sm">Mortgage Term</p>
              <div className="flex border-1 cursor-pointer border-gray-400 overflow-hidden rounded-md focus-within:border-primary-lime hover:border-primary-lime">
                <label
                  for="mortgage-term"
                  className="w-12 h-12 flex justify-center items-center font-bold bg-neutral-slate-100 text-[20px] text-gray-600 hover-without group-hover:bg-primary-lime group-focus-within:bg-primary-lime cursor-pointer"
                >
                  £
                </label>
                <input
                  type="text"
                  name="mortgage-term"
                  id="mortgage-term"
                  className="w-full border-none focus:outline-none cursor-pointer"
                />
              </div>
            </div>
            <div className="flex flex-col group gap-2">
              <p className="text-gray-500 text-sm">Interest Rate</p>
              <div className="flex border-1 cursor-pointer border-gray-400 overflow-hidden rounded-md focus-within:border-primary-lime hover:border-primary-lime">
                <label
                  for="interest-rate"
                  className="w-12 h-12 flex justify-center items-center font-bold bg-neutral-slate-100 text-[20px] text-gray-600 hover-without group-hover:bg-primary-lime group-focus-within:bg-primary-lime cursor-pointer"
                >
                  £
                </label>
                <input
                  type="text"
                  name="interest-rate"
                  id="interest-rate"
                  className="w-full border-none focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <p className="text-gray-500 text-sm">Mortgage Type</p>
            <div className="w-full flex ">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="options"
                  value="option1"
                  className="peer hidden"
                />
                <div className="w-6 h-6 border-2 border-gray-400 rounded-md peer-checked:bg-primary-lime transition-colors"></div>
                <span className="text-gray-700">Repayment</span>
              </label>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="options"
                value="option2"
                className="peer hidden"
              />
              <div className="w-6 h-6 border-2 border-gray-400 rounded-md peer-checked:bg-primary-lime transition-colors"></div>
              <span className="text-gray-700">Option 2</span>
            </label>
          </div>
        </div>

        <div className="bg-neutral-slate-900 opacity-[.95] h-full w-1/2 rounded-bl-[5rem]"></div>
      </div>
    </div>
  );
}

export default App;
