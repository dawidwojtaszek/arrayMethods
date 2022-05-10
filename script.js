const addUser = document.getElementById("add-user");
const main = document.getElementById("main");
const double = document.getElementById("double");
let data = [];

addUser.addEventListener("click", getRandomUser);
double.addEventListener("click", doubleMoney);

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
    element.innerHTML = `<strong>${e.name}</strong> ${e.money}`;
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
