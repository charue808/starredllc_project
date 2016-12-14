import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import { Orders } from '/lib/collections/orders.js';
import { Catalogs } from '/lib/collections/catalogs.js';
import '/lib/common.js';
import './edit-order.html';


// Global Variables
  //Books Ordered
  var booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
/*
// Set Context for orderId
Template.editOrderContextSet.onRendered(function() {

  // Load session variable with (sample) order from Order collection
  //
  publisherIdTemp = FlowRouter.getQueryParam("publisherId");

  currentOrder = Orders.findOne({status: "In progress", publisherId: publisherIdTemp });
  //Session.set('currentOrderIdSessionVar', "");
  if(currentOrder)
  {
    booksOrderedTemp = currentOrder.booksOrdered;

  }
  else
  {
  currentOrder = {status:"Pending", publisherId: publisherIdTemp};
  //booksOrderTemp = {};
  }

  console.log("This is my order details: ", currentOrder);
});

/* Context being at the datatable
// Order contact set to current publisher selected
Template.editOrderContextSet.helpers({
  orderContext() {

//   return {{publisherId: FlowRouter...}};
  }
});
*/

Template.editOrder.helpers({
  selector() {

    publisherIdTemp = FlowRouter.getQueryParam("publisherId");

    currentOrder = Orders.findOne({status: "In progress", publisherId: publisherIdTemp });
    //Session.set('currentOrderIdSessionVar', "");
    if(currentOrder)
    {
      booksOrderedTemp = currentOrder.booksOrdered;
      console.log("Found a current order:", currentOrder);
    }
    else
    {
    currentOrder = {status:"Pending", publisherId: publisherIdTemp};
    //currentOrder = Orders.findOne({status: "In progress", publisherId: publisherIdTemp });

    console.log("Didn't find a current order:", currentOrder);

    //booksOrderTemp = {};
    }

    return { publisher: currentOrder.publisherId };
  }
});

Template.editOrder.events({
  'click #saveOrderBtn': function() {
    console.log("clicked");
    Meteor.call('createOrder', publisherIdTemp, booksOrderedTemp, (error, response) => {
      if (error) {
        console.log("what is the error:", error)
      } else {
        console.log("Success", response)
        Bert.alert('Your order has been saved!', 'success', 'fixed-bottom');
      }
    });
  }
});

Template.addQTYCell.helpers({
  currentQty() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if(currentBook){
      console.log("The value of this is:", currentBook.qty);
      return booksOrderedTemp[bookId].qty;
    }

  }
});

// User can add/update quantity of items added to order
Template.addQTYCell.events({
  'change .qtyBox': function() {

    console.log("there was a change!");

    var inputBoxSelector = "#qtyEntered-" + this._id;
    var inputBoxQty = $(inputBoxSelector).val();
    console.log("Quantity Entered is: ", inputBoxQty);

    let bookDetail = Catalogs.findOne(this._id);
    bookDetail.qty = inputBoxQty;
    console.log("Row Data is:", bookDetail);
    //booksOrdered = bookDetail[this._id];
    let qty = bookDetail.qty;
    let price = bookDetail.listPrice;
    console.log("the price for this for is", price);
    let numPrice = price.replace(/[^0-9\.]+/g, "");
    console.log("this is the list price without string", numPrice);
    let bookTotal = Number(qty) * Number(numPrice);
    console.log("this is the result of qty and listPrice", bookTotal);
    console.log("this is the book total to add:", bookTotal);
    bookDetail.netTotal = bookTotal.toFixed(2);

    booksOrderedTemp[this._id] = bookDetail;
    console.log("these are the books ordered", booksOrderedTemp);
  }
});

Template.rowTotalCell.helpers({
  rowTotal() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if (currentBook) {
      console.log("the total for this book is:", currentBook.netTotal);
      let num = booksOrderedTemp[bookId].netTotal;
      let total = '$' + num;
      return total;
    }

  }
});

Template.discountCell.events({
  'keydown #discountInputBox': function(event) {
    // experiment to get value from input on enter keypress
    if(event.which === 13) {
      let bookId = this._id;
      let currentBook = booksOrderedTemp[bookId];

      console.log('this is the book id', currentBook);
      let price = currentBook.listPrice;
      console.log("this is the list price", price);
      let formatPrice = price.replace(/[^0-9\.]+/g, "");
      var text = event.currentTarget.value;
      console.log("this is the text in the box", text);
      let discountedPrice = Number(formatPrice) - Number(text);
      console.log("this is the price with discount", discountedPrice.toFixed(2));
    }
  }
});
