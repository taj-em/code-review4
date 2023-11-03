function DataBase() {
  this.orders = {};
  this.currentId = 0;
}

DataBase.prototype.addAccount = function (order) {
  bankAccount.id = this.assignId();
  this.orders[order.id] = order;
}

DataBase.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
}

function NewOrder(orderName, toppings, size) {
  this.orderName = orderName;
  this.toppings = toppings;
  this.size = size;
}

NewOrder.prototype.calcPrice = function() {
  const toppings = this.toppings;
  const size = this.size;
  let price = toppings + size;
  return price;
}