const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
base_url = "https://v6.exchangerate-api.com/v6/4cdf7c6f57f1058e2ee551b4/latest";
let msg = document.querySelector(".msg");

for (let select of dropdowns) {
	for (curr_code in countryList) {
		let newOption = document.createElement("option");
		newOption.innerText = curr_code;
		newOption.value = curr_code;

		if (select.name === "from" && curr_code === "USD") {
			newOption.selected = "selected";
		} else if (select.name === "to" && curr_code === "INR") {
			newOption.selected = "selected";
		}

		select.append(newOption);
	}
	select.addEventListener("change", (event) => {
		updateFlag(event.target);
		console.log(event.target);
		console.log(event.target.value);
	});
}

const updateFlag = (element) => {
	//element -> whose flag we want to update
	let curr_code = element.value;
	let countruCode = countryList[curr_code];
	new_src = `https://flagsapi.com/${countruCode}/flat/64.png`;

	let image = element.parentElement.querySelector("img");
	image.src = new_src;
};

const getExchangeRate = async () => {
	let amount = document.querySelector(".amount input").value;

	if (amount === "" || amount <= 0) {
		alert("Enter valid amount");
	}

	let from = document.querySelector("#from").value;
	let to = document.querySelector("#to").value;
	const url = base_url + `/${from}`;

	let response = await fetch(url);
	let data = await response.json();
	let result = data.conversion_rates[to];

	let finalAmount = result * amount;
	msg.innerText = `${amount} ${from} = ${finalAmount} ${to}`;
};

btn.addEventListener("click", (event) => {
	event.preventDefault();
	getExchangeRate();
});

window.addEventListener("load", () => {
	getExchangeRate();
});

//adding swap button
const swap_btn = document.querySelector("#swap");
swap_btn.addEventListener("click", () => {
	//get currrent values
	let from_value = document.querySelector("#from").value;
	let to_value = document.querySelector("#to").value;

	//swap values
	let from = document.querySelector("#from");
	from.value = to_value;

	let to = document.querySelector("#to");
	to.value = from_value;

	//update flag
	updateFlag(from);
    updateFlag(to);
    
    //update exchange rate
    getExchangeRate();
});
