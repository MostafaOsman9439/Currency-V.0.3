const amountInput = document.querySelector(".amount");
const convertBtn = document.querySelector(".convert-btn");
const egpSpan = document.querySelector(".egp span");
const sarSpan = document.querySelector(".sar span");
const base = document.querySelector(".base-amount");
const sarDiv = document.querySelector(".sar");
const egpDiv = document.querySelector(".egp");
const swapBtn = document.querySelector(".swap");

let isEgpFirst = true;
let cachedRates = null;

async function getRates() {
  try {
    const response = await fetch(
      "https://api.currencyfreaks.com/v2.0/rates/latest?apikey=c2ec46d03b8941d181f768e5b816e424"
    );
    const currency = await response.json();
    cachedRates = currency.rates;
    calculate();
  } catch (error) {
    console.error("Failed to fetch:", error);
    egpSpan.innerHTML = "Error";
    sarSpan.innerHTML = "Error";
  }
}

function calculate() {
  if (!cachedRates) return;
  egpSpan.innerHTML = Math.round(amountInput.value * cachedRates["EGP"]);
  sarSpan.innerHTML = Math.round(amountInput.value * cachedRates["SAR"]);
}

base.style.order = "1";
egpDiv.style.order = "2";
sarDiv.style.order = "3";
convertBtn.style.order = "4";
swapBtn.style.order = "5";

swapBtn.addEventListener("click", () => {
  isEgpFirst = !isEgpFirst;
  egpDiv.style.order = isEgpFirst ? "2" : "3";
  sarDiv.style.order = isEgpFirst ? "3" : "2";
});

convertBtn.addEventListener("click", calculate);
amountInput.addEventListener("input", calculate);

getRates();