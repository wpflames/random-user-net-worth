const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleMoneyBtn = document.getElementById('double-money');
const showMillionareBtn = document.getElementById('show-millionares');
const sortBtn = document.getElementById('sort');
const calcWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}` ,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

// Double everyones money
function doubleMoney(){
  data = data.map(user => {
    return {...user, money: user.money * 2};
  });
  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

// Filter only millionaires 
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  console.log(formatMoney(wealth));

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong> </h3>`;

  main.appendChild(wealthEl);
}

// Add new object to data array
function addData(obj) {
  data.push(obj);
  
  updateDOM();
}



// Update DOM
function updateDOM(providedData = data) {
  // Clear the main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return '$ '+number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionareBtn.addEventListener('click', showMillionaires);
calcWealthBtn.addEventListener('click', calculateWealth);

const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
