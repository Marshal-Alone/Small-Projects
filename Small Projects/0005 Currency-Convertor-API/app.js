const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
base_url = "https://v6.exchangerate-api.com/v6/4cdf7c6f57f1058e2ee551b4/latest";
let msg = document.querySelector(".msg");

let swap = document.querySelector("#swap");

swap.addEventListener("click", () => {
	console.log("swapping ....");
	let from = document.querySelector("#from");
	let to = document.querySelector("#to");

	let from_value = document.querySelector("#from").value;
	let to_value = document.querySelector("#to").value;
	from.value = to_value;
    to.value = from_value;
    
    updateFlag(document.querySelector("#from"))
    updateFlag(document.querySelector("#to"))

    getExchangeRate();
});

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

// const api = '4cdf7c6f57f1058e2ee551b4';

// const btn = document.querySelector('#btn');;

// const getCurr = async () => {
//     let from = document.querySelector('#from').value;
//     let to = document.querySelector('#to').value;
//     const url = `https://v6.exchangerate-api.com/v6/${api}/latest/${from}`

//     let response = await fetch(url);
//     let data = await response.json();

//     console.log(data.conversion_rates[to]);

// }

// btn.addEventListener('click', (event) => {
//     event.preventDefault();
//     getCurr();
// });