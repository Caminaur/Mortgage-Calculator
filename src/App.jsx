import { useEffect, useState } from "react";
import "./App.css";
import CalculatorIconUrl from "./assets/icon-calculator.svg";
import IllustrationEmpty from "./assets/illustration-empty.svg";

function App() {
  const [focusedInput, setFocusedInput] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [totalPayment, setTotalPayment] = useState("");
  const inputs = [
    "amount",
    "mortgage-term",
    "interest-rate",
    "radio-1",
    "radio-2",
    "btn",
  ];

  function resetForm() {
    setShowResults(false);
    setMonthlyPayment("");
    setTotalPayment("");

    const radioButtons = document.querySelectorAll('input[type="radio"]');
    for (const radioButton of radioButtons) {
      radioButton.checked = false;
    }

    const inputFields = document.querySelectorAll('input[type="number"]');
    for (const inputField of inputFields) {
      inputField.value = "";
    }

    const errorMessages = document.querySelectorAll(".error");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });
  }

  function nextFocusedInput() {
    setFocusedInput((d) => (d + 1) % 6);
  }

  useEffect(() => {
    const input = document.getElementById(inputs[focusedInput]);
    input.focus();
  }, [focusedInput]);

  function handleSubmit(e) {
    e.preventDefault();

    let isThereError = false;

    // remove previous error messages
    const errorMessages = document.querySelectorAll(".error");
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
      errorP.className = "error";
      parentDiv.appendChild(errorP);
      isThereError = true;
    }

    for (const field_id of fields_ids) {
      const field = document.getElementById(field_id);
      if (field.value === "") {
        const parentDiv = field.parentElement.parentElement;
        const errorP = document.createElement("p");
        errorP.innerText = "This field is required";
        errorP.className = "error";
        parentDiv.appendChild(errorP);
        isThereError = true;
      }
    }

    if (!isThereError) {
      handleResults();
    }
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

    window.addEventListener("keydown", handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleResults() {
    setShowResults(true);
    const amount = document.getElementById("amount").value;
    const mortgageTerm = document.getElementById("mortgage-term").value;
    const interestRate = document.getElementById("interest-rate").value;
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    let mortgageType = "";

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        mortgageType = radioButton.value;
      }
    }

    const totalPayment = amount * (1 + interestRate / 100);
    const monthlyPayment = totalPayment / mortgageTerm / 12;

    const formattedMonthlyPayment = monthlyPayment.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });

    const formattedTotalPayment = totalPayment.toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
    setMonthlyPayment(formattedMonthlyPayment);
    setTotalPayment(formattedTotalPayment);
  }

  return (
    <div className="h-screen w-screen flex justify-around items-center bg-neutral-slate-100 p-1.5 max-sm:p-0 flex-col">
      <div className="h-150 w-230 max-w-[100%] rounded-2xl flex overflow-hidden bg-neutral-white max-sm:h-full max-sm:w-full max-sm:flex-col max-sm:rounded-none">
        <form
          action="#"
          className="h-full w-1/2 p-8 flex flex-col justify-between max-sm:w-full  max-sm:p-4 "
        >
          <div className="flex w-full justify-between items-center max-sm:flex-col max-sm:items-start text-neutral-slate-900">
            <p className="font-bold text-[20px] ">Mortgage Calculator</p>
            <p
              className="text-neutral-slate-300 underline text-sm cursor-pointer hover:text-slate-700"
              onClick={resetForm}
            >
              Clear All
            </p>
          </div>
          <div className="flex flex-col gap-4 max-sm:gap-1">
            <div className="w-full flex flex-col gap-2 group max-sm:gap-1">
              <p className="grayText">Mortgage Amount</p>
              <div className="inputDiv">
                <label
                  for="amount"
                  className="w-12 h-12 flex justify-center items-center font-bold bg-neutral-slate-100 text-[20px] text-neutral-slate-700 hover-without group-focus-within:bg-primary-lime cursor-pointer group-has-[.error]:bg-primary-red group-has-[.error]:text-neutral-white transition duration-200 ease-in"
                >
                  £
                </label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  className="input"
                  step="100"
                />
              </div>
            </div>
            <div className="w-full flex gap-2 ">
              <div className="flex flex-col group gap-2 max-sm:gap-1">
                <p className="grayText">Mortgage Term</p>
                <div className="inputDiv">
                  <input
                    type="number"
                    name="mortgage-term"
                    id="mortgage-term"
                    className="input"
                  />
                  <label for="mortgage-term" className="label text-md ">
                    years
                  </label>
                </div>
              </div>
              <div className="flex flex-col group gap-2 max-sm:gap-1">
                <p className="grayText">Interest Rate</p>
                <div className="inputDiv">
                  <input
                    type="number"
                    name="interest-rate"
                    id="interest-rate"
                    className="input"
                  />
                  <label for="interest-rate" className="label">
                    %
                  </label>
                </div>
              </div>
            </div>
            <div className="flex flex-col  gap-2 max-sm:gap-1" id="radioDiv">
              <p className="grayText">Mortgage Type</p>

              <div className="w-full flex ">
                <label className="radioLabel">
                  <input
                    type="radio"
                    name="options"
                    value="repayment"
                    className="peer opacity-0 absolute"
                    id="radio-1"
                  />

                  <div className="radioSelector"></div>
                  <span className="text-neutral-slate-700 font-bold">
                    Repayment
                  </span>
                </label>
              </div>
              <div className="w-full flex ">
                <label className="radioLabel">
                  <input
                    type="radio"
                    name="options"
                    value="intertest_only"
                    className="peer opacity-0 absolute"
                    id="radio-2"
                  />

                  <div className="radioSelector"></div>
                  <span className="text-neutral-slate-700 font-bold">
                    Interest Only
                  </span>
                </label>
              </div>
            </div>
          </div>
          <button className="btn" id="btn" type="submit" onClick={handleSubmit}>
            <img src={CalculatorIconUrl} alt="" />
            <label
              className="text-neutral-slate-900 cursor-pointer content-center"
              htmlFor="btn"
            >
              Calculate Repayments
            </label>
          </button>
        </form>
        {!showResults ? (
          <div className="bg-neutral-slate-900 opacity-[.95] h-full w-1/2 rounded-bl-[5rem] flex flex-col justify-center items-center gap-3 max-sm:w-full max-sm:rounded-none max-sm:pb-6 max-sm:gap-1">
            <img src={IllustrationEmpty} alt="" />
            <span className="title font-bold text-[20px] text-neutral-white">
              Results shown here
            </span>
            <span className="description w-full text-center px-8 text-neutral-slate-300 text-sm">
              Complete the form and click “calculate repayments” to see what
              your monthly repayments would be.
            </span>
          </div>
        ) : (
          <div className="bg-neutral-slate-900 opacity-[.95] h-full w-1/2 rounded-bl-[5rem] flex flex-col justify-start gap-3 max-sm:w-full max-sm:rounded-none p-8  max-sm:p-4 max-sm:pb-6 max-sm:gap-1">
            <span className="title font-bold text-[22px] text-neutral-white">
              Your results
            </span>
            <span className="description w-full text-neutral-slate-100 font-light text-sm">
              Your results are shown below based on the information you
              provided. To adjust the results, edit the form and click
              “calculate repayments” again.
            </span>
            <div className="w-full h-full py-6 max-sm:py-0 ">
              <div className="w-full h-full bg-neutral-slate-900 rounded-2xl border-t-3 border-primary-lime flex flex-col justify-between p-6  max-sm:p-4">
                <div className="flex flex-col gap-4 justify-start h-full py-2">
                  <span className="grayText">Your monthly repayments</span>
                  <span
                    className="text-primary-lime text-6xl  max-sm:text-5xl"
                    id="monthly-payment"
                  >
                    {monthlyPayment}
                  </span>
                </div>
                <div className="w-full h-0.5 bg-neutral-slate-100 rounded-e-full"></div>
                <div className="h-full flex flex-col justify-end gap-2">
                  <span className="grayText">
                    Total you'll repay over the term
                  </span>
                  <span
                    className="text-neutral-white text-2xl"
                    id="total-payment"
                  >
                    {totalPayment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="text-[11px] absolute bottom-2 text-center text-neutral-slate-900 max-sm:text-xs sm:text-neutral-slate-700 max-sm:text-neutral-slate-500">
        <a
          className="text-blue-600 font-bold max-sm:text-primary-lime"
          href="https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73"
        >
          Challenge
        </a>{" "}
        coded by{" "}
        <a
          href="https://github.com/Caminaur/Mortgage-Calculator"
          className="text-blue-600 font-bold max-sm:text-primary-lime"
        >
          Julian Caminaur
        </a>
        .
      </div>
    </div>
  );
}

export default App;
