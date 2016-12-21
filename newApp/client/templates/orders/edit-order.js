import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

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
  booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
  var discountCellChanging = false;
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
/*
function calcNetPrice(user) {
  let loggedInUser = Meteor.user();

  if (Roles.userIsInRole(loggedInUser, ['admin'])) {
    console.log("This is the admin logged in");
    let price = bookDetail.listPrice;
    return price;
  } else {
    let price = bookDetail.yourPrice;
    console.log("this is not the admin");
    return price;
  }
}
*/

Template.editOrder.onCreated(function templateOnCreated() {
  this.state = new ReactiveDict();
});

Template.editOrder.helpers({
  selectorHelper() {

    publisherIdTemp = FlowRouter.getQueryParam("publisherId");
    userIdTemp = Meteor.userId();
    currentOrder = Orders.findOne({status: "In progress", publisherId: publisherIdTemp, userId:userIdTemp });
    //Session.set('currentOrderIdSessionVar', "");
    if(currentOrder)
    {
      booksOrderedTemp = currentOrder.booksOrdered;
      console.log("Found a current order:", currentOrder);
    }
    else
    {
    currentOrder = {status:"Pending", publisherId: publisherIdTemp, userId: userIdTemp};
    //currentOrder = Orders.findOne({status: "In progress", publisherId: publisherIdTemp });

    console.log("Didn't find a current order:", currentOrder);

    booksOrderedTemp = {};
    }

    const instance = Template.instance();
    if (instance.state.get('hideUnorderedBooks')) {
      console.log("right now, booksOrderedTemp is ", booksOrderedTemp);

      var booksOrderedArray = [];
      for(var bookId in booksOrderedTemp){
        booksOrderedArray.push(bookId);
      }
        //return books in an order that thave a quantity by publisherId
        return { publisher: currentOrder.publisherId, _id: {$in: booksOrderedArray}};
    } else {
      // return all books with publisher selector
      return { publisher: currentOrder.publisherId };
    }
  }
});

Template.editOrder.events({
  'click #saveOrderBtn': function() {
    console.log("clicked");
    if (!discountCellChanging) {
      Meteor.call('createOrder', publisherIdTemp, userIdTemp, booksOrderedTemp, (error, response) => {
        if (error) {
          console.log("what is the error:", error)
        } else {
          console.log("Success", response)
          Bert.alert('Your order has been saved!', 'success', 'fixed-bottom');
        }
      });
    }
  },
  'change .hideUnorderedBooks input'(event, instance) {
    instance.state.set('hideUnorderedBooks', event.target.checked);
  },
});

/*
Template.addQTYCell.helpers({
  currentQty() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if(currentBook){
      //console.log("The value of this is:", currentBook.qty);
      return booksOrderedTemp[bookId].qty;
    }

  }
});
*/
/*
// User can add/update quantity of items added to order
Template.addQTYCell.events({
  'change .qtyBox': function() {
    if(!booksOrderedTemp) {
      booksOrderedTemp = {};
    }
    if(!booksOrderedTemp[this._id]) {
      booksOrderedTemp[this._id] = Catalogs.findOne(this._id);
    }
    console.log("there was a change!");

    var inputBoxSelector = "#qtyEntered-" + this._id;
    var inputBoxQty = $(inputBoxSelector).val();
    //console.log("Quantity Entered is: ", inputBoxQty);


    booksOrderedTemp[this._id].qty = inputBoxQty;
    //console.log("Row Data is:", bookDetail);
    //booksOrdered = bookDetail[this._id];
    var userPriceSelector = '#userPrice-' + this._id;
    //console.log("Price Selector", userPriceSelector);
    var userPrice = $(userPriceSelector).text();
    //console.log('The price for the user is', userPrice);


    let price = userPrice;
    let qty = inputBoxQty;

    //console.log("the price for this for is", price);
    let numPrice = price.replace(/[^0-9\.]+/g, "");
    //console.log("this is the list price without string", numPrice);
    booksOrderedTemp[this._id].selectedPrice = numPrice;
    let bookTotal = Number(qty) * Number(numPrice);
    //console.log("this is the result of qty and listPrice", bookTotal);
    //console.log("this is the book total to add:", bookTotal);
    booksOrderedTemp[this._id].netTotal = bookTotal.toFixed(2);
    console.log("these are the books ordered", booksOrderedTemp);
  }
});
*/
/*
Template.rowTotalCell.helpers({
  netTotal() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if (currentBook) {
      let discount = currentBook.discount;
      if (!discount) {
        discount = 0;
      }
      //console.log("the discount for this book is:", discount);
      let price = currentBook.selectedPrice;
      //console.log("the user price for this book is:", price);
      let qty = currentBook.qty;
      //console.log("the qty for this book is:", qty);
      let newPrice = Number(price * (1 - discount / 100));
      let formatNewPrice = newPrice;//.toFixed(2);
      //console.log("this is the new price", formatNewPrice);
      let newTotal = formatNewPrice * Number(qty);
      //console.log("this is the new total variable", newTotal);
      let formatNewTotal = newTotal.toFixed(2);
      //console.log("this is the new total with discount:", formatNewTotal);
      currentBook.netTotal = formatNewTotal;
      let num = currentBook.netTotal;

      let total = '$' + num;
      return total;
    }

  }
});
*/
/*
Template.discountCell.events({
  'mouseenter #discountInputBox': function(e, template) {
      e.preventDefault();
      discountCellChanging = true;
      //console.log("this cell is changing", discountCellChanging);
      let discountAmt = template.find('#discountInputBox').value;
      //console.log("this is the discount amount:", discountAmt);

  },
  'keypress #discountInputBox': function(e, template) {
    if(event.which === 13){
      e.preventDefault();
    }
      discountCellChanging = true;
      //console.log("this cell is changing", discountCellChanging);
      let discountAmt = template.find('#discountInputBox').value;
      //console.log("this is the discount amount:", discountAmt);

      // save values to booksOrderedTemp
      booksOrderedTemp[this._id].discount = discountAmt;
      discountCellChanging = false;
      console.log("this cell is changing", discountCellChanging);


  },
  'mouseleave #discountInputBox': function(e, template) {
      //save values to booksOrderedTemp
      let discountAmt = template.find('#discountInputBox').value;
      if (booksOrderedTemp[this._id]) {
        booksOrderedTemp[this._id].discount = discountAmt;
        discountCellChanging = false;
      } else {
        Bert.alert('Please enter a quantity', 'error', 'growl-top-right');
      }
  },

});
*/
/*
Template.discountCell.helpers({
  currentDiscount() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if (currentBook) {
      return currentBook.discount;
    }
  }
});
*/
/*
Template.priceCell.helpers({
  netPrice() {
    let bookId = this._id;
    let bookDetail = Catalogs.findOne(bookId);
    let loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['public-schools', 'private-schools'])) {
      //console.log("The user is from the public or private schools");
      let price = bookDetail.listPrice;
      return price;
    } else if(Roles.userIsInRole(loggedInUser, ['military', 'state-library'])) {
      let price = bookDetail.yourPrice;
      //console.log("the user is military or state library");
      return price;
    }

  }
});
*/
