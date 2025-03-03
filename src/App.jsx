import { useEffect, useState } from "react";
import "./App.css";
import CalculatorIconUrl from "./assets/icon-calculator.svg";
import IllustrationEmpty from "./assets/illustration-empty.svg";

function App() {
  const [focusedInput, setFocusedInput] = useState(0);
  const [inputs, setInputs] = useState([
    "amount",
    "mortgage-term",
    "interest-rate",
    "radio-1",
    "radio-2",
    "btn",
  ]);

  function nextFocusedInput() {
    setFocusedInput((d) => (d + 1) % 6);
  }

  useEffect(() => {
    const input = document.getElementById(inputs[focusedInput]);
    input.focus();
  }, [focusedInput]);

  function handleSubmit(e) {
    e.preventDefault();

    // remove previous error messages
    const errorMessages = document.querySelectorAll(".text-primary-red");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });

    // verify if fields are empty
    const fields_ids = ["amount", "mortgage-term", "interest-rate"];
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let radioChecked = false;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        radioChecked = true;
      }
    }

    if (!radioChecked) {
      const parentDiv = document.getElementById("radioDiv");
      const errorP = document.createElement("p");
      errorP.innerText = "This field is required";
      errorP.className = "text-primary-red";
      parentDiv.appendChild(errorP);
    }

    for (const field_id of fields_ids) {
      const field = document.getElementById(field_id);
      if (field.value === "") {
        const parentDiv = field.parentElement.parentElement;
        const errorP = document.createElement("p");
        errorP.innerText = "This field is required";
        errorP.className = "text-primary-red";
        parentDiv.appendChild(errorP);
      } else {
        // DO SOMETHING
      }
    }
    console.log(e);
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        nextFocusedInput();
      }
      if (e.key === "Enter") {
        e.preventDefault();
        if (e.target.type === "radio") {
          e.target.click();
        } else {
          handleSubmit(e);
        }
      }
    };
    const handleKeyUp = (e) => {
      if (e.key === "Shift") {
        setIsShiftPressed(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // ✅ Cleanup function to remove event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex justify-around items-center bg-neutral-slate-100 p-1.5 max-sm:p-0">
      <div className="h-140 w-220 rounded-2xl flex overflow-hidden bg-neutral-white max-sm:h-full max-sm:w-full max-sm:flex-col max-sm:rounded-none">
        <form
          action="#"
          className="h-full w-1/2 p-8 flex flex-col justify-between max-sm:w-full "
        >
          <div className="flex w-full justify-between items-center max-sm:flex-col max-sm:items-start">
            <p className="font-bold text-[20px] ">Mortgage Calculator</p>
            <p className="text-gray-500 underline text-sm">Clear All</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="w-full flex flex-col gap-2  group">
              <p className="grayText">Mortgage Amount</p>
              <div className="inputDiv">
                <label
                  for="amount"
                  className="w-12 h-12 flex justify-center items-center font-bold bg-neutral-slate-100 text-[20px] text-gray-600 hover-without group-focus-within:bg-primary-lime cursor-pointer"
                >
                  £
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="input"
                  step="100"
                  tabindex="1"
                />
              </div>
            </div>
            <div className="w-full flex gap-2 ">
              <div className="flex flex-col group gap-2">
                <p className="grayText">Mortgage Term</p>
                <div className="inputDiv">
                  <input
                    type="number"
                    name="mortgage-term"
                    id="mortgage-term"
                    className="input"
                    tabindex="2"
                  />
                  <label
                    for="mortgage-term"
                    className="label text-md  hover-without"
                  >
                    years
                  </label>
                </div>
              </div>
              <div className="flex flex-col group gap-2">
                <p className="grayText">Interest Rate</p>
                <div className="inputDiv">
                  <input
                    type="number"
                    name="interest-rate"
                    id="interest-rate"
                    className="input"
                    tabindex="3"
                  />
                  <label for="interest-rate" className="label">
                    %
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-2" id="radioDiv">
              <p className="grayText">Mortgage Type</p>

              <div className="w-full flex ">
                <label className="radioLabel">
                  <input
                    type="radio"
                    name="options"
                    value="repayment"
                    className="peer opacity-0 absolute"
                    tabindex="4"
                    id="radio-1"
                  />

                  <div className="radioSelector"></div>
                  <span className="text-gray-700 font-bold">Repayment</span>
                </label>
              </div>
              <div className="w-full flex ">
                <label className="radioLabel">
                  <input
                    type="radio"
                    name="options"
                    value="intertest_only"
                    className="peer opacity-0 absolute"
                    tabindex="5"
                    id="radio-2"
                  />

                  <div className="radioSelector"></div>
                  <span className="text-gray-700 font-bold">Interest Only</span>
                </label>
              </div>
            </div>
          </div>
          <button
            className="btn"
            id="btn"
            type="submit"
            onClick={handleSubmit}
            tabindex="6"
          >
            <img src={CalculatorIconUrl} alt="" />
            <label
              className="text-neutral-slate-900 cursor-pointer content-center"
              htmlFor="btn"
            >
              Calculate Repayments
            </label>
          </button>
        </form>
        <div className="bg-neutral-slate-900 opacity-[.95] h-full w-1/2 rounded-bl-[5rem] flex flex-col justify-center items-center gap-3 max-sm:w-full max-sm:rounded-none">
          <img src={IllustrationEmpty} alt="" />
          <span className="title font-bold text-[20px] text-neutral-white">
            Results shown here
          </span>
          <span className="description w-full text-center px-8 grayText">
            Complete the form and click “calculate repayments” to see what your
            monthly repayments would be.
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
