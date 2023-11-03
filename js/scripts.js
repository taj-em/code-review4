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
  let currentOrder = dataBase.orders.order[Object.keys(dataBase.orders).length];
  let toppingObj = {};
  for (let index = 0; index < toppings.length; index += 1) {
    if (toppings[index].checked === true)
      toppingObj[index] = toppings[index].value;
  }Object.keys(dataBase.orders).length
  if (Object.keys(currentOrder.pizzas).length < currentOrder.orderSize) {
  makePizza(pizzaSize, toppingObj);
} else {
  displayPrice(currentOrder);
}}

function displayPrice(currentOrder) {
  const display = document.getElementById("display-price");
  const priceArray = Object.values(currentOrder.pizzas);
  display.innerText = currentOrder.price;
}

window.addEventListener("load", function () {
  this.document.getElementById("make-order").addEventListener("submit", orderCreation)
  this.document.getElementById("make-pizza").addEventListener("submit", pizzaCreation)
});