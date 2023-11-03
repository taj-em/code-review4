function DataBase() {
  this.orders = {};
  this.currentId = 0;
}

DataBase.prototype.addOrder = function (order) {
  order.id = this.assignId();
  order.price = order.getPrice(order.toppingObj);
  this.orders[order.id] = order;
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

Order.prototype.getPrice = function(toppingObj) {
  let toppingSum = 0;
  let toppingArray = Object.values(toppingObj);
  let integerArray = toppingArray.map(Number);
  integerArray.forEach(topping => {
    toppingSum += topping;
  });
  const orderSize = this.orderSizesize;
  let price = toppingSum + orderSize;
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

window.addEventListener("load", function() {
  this.document.getElementById("make-order").addEventListener("submit", handleSubmission)
});