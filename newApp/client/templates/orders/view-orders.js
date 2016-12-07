import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';

import { Orders } from '/lib/collections/orders.js';
import '/lib/common.js';
import './view-orders.html';


Template.viewOrders.helpers({
  ordersInProgress() {
    return Orders.find({'status':'In progress'}, {sort: {submitted: -1}});
  }
});

Template.orderItem.events({
  'click #editOrderBtn': function() {
    console.log('clicked! edit order button');
    let order = Orders.findOne(this._id);
    console.log('this is the publisherId', order.publisherId);
    FlowRouter.go('/edit-order?publisherId='+order.publisherId);
  }
});

Template.orderItem.helpers({
  totalQty() {
    let order = Orders.findOne(this._id, {fields: {booksOrdered: 1}});
    console.log("this is the totalQTY helper output:", order);
    let booksOrdered = order.booksOrdered;
    console.log("this are the books ordered:", booksOrdered);
    let summed = 0;
    for (var key in booksOrdered) {
      console.log(booksOrdered[key].qty);
      summed += parseInt(booksOrdered[key].qty);
    }
    console.log(summed);
    return summed;
  },
  totalListPrice() {
    let order = Orders.findOne(this._id, {fields: {booksOrdered: 1}});
    let booksOrdered = order.booksOrdered;
    let summed = 0;
    for (var key in booksOrdered) {
      console.log('This is the qty: '+booksOrdered[key].qty +" "+"this is the price: "+booksOrdered[key].listPrice);
      let qty = booksOrdered[key].qty;
      let price = booksOrdered[key].listPrice;
      let numPrice = price.replace(/[^0-9\.]+/g, "");
      //console.log(numPrice);
      let bookTotal = parseInt(qty) * parseInt(numPrice);
      console.log("this is the total for each ordered book", subTotal);
      summed += bookTotal;
    }
    console.log(summed);
    let subTotal = summed.toFixed(2);
    console.log(subTotal);
    let hiTax = subTotal * 0.04712;
    console.log("the sales tax is: ", hiTax);
    let tax = hiTax.toFixed(2);
    console.log("this is the tax to two decimals", tax);
    let subTotalWithTax = Number(subTotal) + Number(tax);
    console.log(subTotalWithTax);
    var formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    });
    let total = formatter.format(subTotalWithTax);
    console.log(total);
    return total;
  }
});
