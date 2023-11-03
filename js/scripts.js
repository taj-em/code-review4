function DataBase() {
  this.orders = {};
  this.currentId = 0;
}

DataBase.prototype.addOrder = function (order) {
  order.id = this.assignId();
  order.price = order.getPrice();
  this.orders[order.id] = order;
  displayPrice(this.orders[order.id])
}

DataBase.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

function Order(orderName, orderSize, toppingObj) {
  this.orderName = orderName;
  this.toppingObj = toppingObj;
  this.orderSize = orderSize;
}

Order.prototype.getPrice = function() {
  let toppingSum = 0;
  let toppingArray = Object.values(this.toppingObj);
  let integerArray = toppingArray.map(Number);
  integerArray.forEach(topping => {
    toppingSum += topping;
  });
  const orderSize = this.orderSize;
  let price = toppingSum + parseInt(orderSize);
  return price;
}

function calculatePrice(order) {

}

function makeOrder(orderName, orderSize, toppingObj) {
  let newOrder = new Order(orderName, orderSize, toppingObj);
  dataBase.addOrder(newOrder);
}

let dataBase = new DataBase();

function handleSubmission(event) {
event.preventDefault();
const orderName = document.getElementById("order-name").value;
const orderSize = document.querySelector("input[name='order-size']:checked").value;
const toppings = document.querySelectorAll(".topping");
let toppingObj = {};
for (let index = 0; index < toppings.length; index += 1) {
  if (toppings[index].checked === true)
  toppingObj[index] = toppings[index].value;
}
makeOrder(orderName, orderSize, toppingObj);
}

function displayPrice(order) {
  const display = document.getElementById("display-price");
  display.innerText = order.price;
}

window.addEventListener("load", function() {
  this.document.getElementById("make-order").addEventListener("submit", handleSubmission)
});