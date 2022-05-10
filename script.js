const addUser = document.getElementById("add-user");
const main = document.getElementById("main");
const double = document.getElementById("double");
const sort = document.getElementById("sort");
const millioners = document.getElementById("show-millionaires");
const wealth = document.getElementById("calculate-wealth");
let data = [];

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);
sort.addEventListener("click", sortMoney);
millioners.addEventListener("click", showMillioners);
wealth.addEventListener("click", totalWealth);

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addPerson(newUser);
  updateUi();
}

// Add user to data array

function addPerson(obj) {
  data.push(obj);
}

// Update Ui

function updateUi(provideData = data) {
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  provideData.forEach((e) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${e.name}</strong> ${formatMoney(e.money)}`;
    main.appendChild(element);
  });
}

// Double Money

function doubleMoney() {
  const newMoney = data.map((element) => ({
    name: element.name,
    money: element.money * 2,
  }));
  updateUi(newMoney);
  data = newMoney;
}

//Sort Money

function sortMoney() {
  const newMoney = data.sort((a, b) => {
    return b.money - a.money;
  });
  updateUi(newMoney);
  data = newMoney;
}

// Show only millioners

function showMillioners() {
  const newMoney = data.filter((element) => element.money >= 1000000);
  updateUi(newMoney);
  data = newMoney;
}

// total wealth

function totalWealth() {
  const total = data.reduce((acc, person) => (acc += person.money), 0);
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total wealth: <strong>
  ${formatMoney(total)}
  </strong></h3>`;
  main.appendChild(element);
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
