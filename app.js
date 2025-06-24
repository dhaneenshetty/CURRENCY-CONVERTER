
document.addEventListener("DOMContentLoaded", () => {
  const baseURL = "https://v6.exchangerate-api.com/v6/56998b4c84d955d3c805243c";
  const dropdowns = document.querySelectorAll(".dropdown select");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  const button = document.querySelector("form button");
  const amountInput = document.querySelector("form input");

  for (let select of dropdowns) {
    for (let code in countryList) {
      let option = document.createElement("option");
      option.value = code;
      option.innerText = code;
      if (select.name === "from" && code === "USD") option.selected = true;
      if (select.name === "to" && code === "INR") option.selected = true;
      select.append(option);
    }
    select.addEventListener("change", (e) => updateFlag(e.target));
  }

  function updateFlag(select) {
    let currCode = select.value;
    let countryCode = countryList[currCode];
    let imgTag = select.parentElement.querySelector("img");
    imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }

  button.addEventListener("click", async (e) => {
    e.preventDefault();
    let amount = amountInput.value || "1";
    const URL = `${baseURL}/pair/${fromCurr.value}/${toCurr.value}/${amount}`;
    try {
      const res = await fetch(URL);
      const data = await res.json();
      if (data.result === "success") {
        const result = data.conversion_result;
        msg.innerText = `${amount} ${fromCurr.value} = ${result.toFixed(2)} ${toCurr.value}`;
      } else {
        msg.innerText = "Conversion failed!";
      }
    } catch (err) {
      msg.innerText = "API error!";
      console.error(err);
    }
  });
});
