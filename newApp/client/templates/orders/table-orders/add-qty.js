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
import './add-qty.html';

// Global Variables
  //Books Ordered
  booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
  var discountCellChanging = false;



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
