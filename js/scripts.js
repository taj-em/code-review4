function DataBase() {
  this.orders = {};
  this.currentId = 0;
}

DataBase.prototype.addOrder = function (order) {
  order.id = this.assignId();
  this.orders[order.id] = order;
}

DataBase.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

function Order(orderName, orderSize) {
  this.orderName = orderName;
  this.orderSize = orderSize;
  this.pizzas = {};
  this.pizzaNum = 0;
}

Order.prototype.getPizzaNum = function () {
  this.pizzaNum += 1;
  return this.pizzaNum;
}

Order.prototype.addPizza = function (pizza) {
  pizza.id = this.getPizzaNum();
  pizza.price = pizza.getPrice();
  this.pizzas[pizza.id] = pizza;
}

function Pizza(pizzaSize, toppingObj) {
  this.pizzaSize = pizzaSize;
  this.toppingObj = toppingObj;
}

Pizza.prototype.getPrice = function () {
  let toppingSum = 0;
  let toppingArray = Object.values(this.toppingObj).map(Number);
  toppingArray.forEach(topping => {
    toppingSum += topping;
  });
  let price = toppingSum + parseInt(this.pizzaSize);
  return price;
}

let dataBase = new DataBase();

function makeOrder(orderName, orderSize,) {
  let newOrder = new Order(orderName, orderSize);
  dataBase.addOrder(newOrder);
}

function makePizza(pizzaSize, toppingObj) {
  let newPizza = new Pizza(pizzaSize, toppingObj);
  dataBase.orders[Object.keys(dataBase.orders).length].addPizza(newPizza);
}



function orderCreation(event) {
  event.preventDefault();
  const orderName = document.getElementById("order-name").value;
  const orderSize = document.getElementById("order-size").value;
  makeOrder(orderName, orderSize);
  document.getElementById("order-div").classList.add("hidden");
  document.getElementById("pizza-div").classList.remove("hidden");
}


function pizzaCreation(event) {
  event.preventDefault();
  const toppings = document.querySelectorAll(".topping");
  const pizzaSize = document.querySelector("input[name='pizza-size']:checked").value;
  const currentOrder = dataBase.orders[Object.keys(dataBase.orders).length];
  let pizzaCount = 0;
  let orderPrice = 0;
  let toppingObj = {};
  for (let index = 0; index < toppings.length; index += 1) {
    if (toppings[index].checked === true)
      toppingObj[index] = toppings[index].value;
  }
  if (pizzaCount < currentOrder.orderSize) {
    makePizza(pizzaSize, toppingObj);
    pizzaCount = Object.keys(currentOrder.pizzas).length
    if (pizzaCount === parseInt(currentOrder.orderSize)) {
      let pizzaArray = Object.values(currentOrder.pizzas);
      pizzaArray.forEach(pizza => {
        orderPrice += pizza.price
      });
      currentOrder.price = orderPrice;
      displayPrice(currentOrder);
      displayOrder(currentOrder);
      document.getElementById("pizza-div").classList.add("hidden");
      document.getElementById("display-div").classList.remove("hidden");
    }
  }
}

function displayPrice(currentOrder) {
  const display = document.getElementById("display-price");
  display.innerText = currentOrder.price;
}

function displayOrder(currentOrder) {
  const display = document.getElementById("display-order")
  const pizzaDisplay = document.getElementById("display-pizza")
  let pizzaKeys = Object.keys(currentOrder.pizzas);
  pizzaKeys.forEach(ID => {
    pizzaDisplay.innerText += "\nPizza #" + ID + ": \n";
    let pizzaValues = Object.values(currentOrder.pizzas[ID].toppingObj);
    for (let toppingNum = 1; toppingNum <= pizzaValues.length; toppingNum += 1) {
      if (pizzaValues[toppingNum - 1] === "1") {
        pizzaDisplay.innerText += "Topping #" + toppingNum + ": Extra Cheese\n";
      } else if (pizzaValues[toppingNum - 1] === "2") {
        pizzaDisplay.innerText += "Topping #" + toppingNum + ": Pepperoni\n";
      } else if (pizzaValues[toppingNum - 1] === "3") {
        pizzaDisplay.innerText += "Topping #" + toppingNum + ": Sausage\n";
      }
    }
  })
  display.innerText = "Order #" + currentOrder.id + "\nOrder Name: " + currentOrder.orderName + "\nPizzas: " + currentOrder.orderSize + "\n";
}

window.addEventListener("load", function () {
  this.document.getElementById("make-order").addEventListener("submit", orderCreation)
  this.document.getElementById("make-pizza").addEventListener("submit", pizzaCreation)
  this.document.getElementById("pizza-div").classList.add("hidden");
});