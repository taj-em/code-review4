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

function makeOrder(orderName, orderSize,) {
  let newOrder = new Order(orderName, orderSize);
  dataBase.addOrder(newOrder);
}

function makePizza(pizzaSize, toppingObj) {
  let newPizza = new Pizza(pizzaSize, toppingObj);
  dataBase.orders[Object.keys(dataBase.orders).length].addPizza(newPizza);
}

let dataBase = new DataBase();

function orderCreation(event) {
  event.preventDefault();
  const orderName = document.getElementById("order-name").value;
  const orderSize = document.getElementById("order-size").value;
  makeOrder(orderName, orderSize);
}

function pizzaCreation(event) {
  event.preventDefault();
  const toppings = document.querySelectorAll(".topping");
  const pizzaSize = document.querySelector("input[name='pizza-size']:checked").value;
  console.log(Object.keys(dataBase.orders).length)
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
      displayPrice(currentOrder.pizzas[Object.keys(currentOrder.pizzas).length]);
    }
  }
}

function displayPrice(currentOrder) {
  const display = document.getElementById("display-price");
  display.innerText = currentOrder.price;
  // displayOrder(currentOrder);
}

function displayOrder(currentOrder) {
  const display = document.getElementById("display-order")
  display.innerText = "Pizza #" + currentOrder.pizzas[(currentOrder.pizzas).length];
}

window.addEventListener("load", function () {
  this.document.getElementById("make-order").addEventListener("submit", orderCreation)
  this.document.getElementById("make-pizza").addEventListener("submit", pizzaCreation)
});