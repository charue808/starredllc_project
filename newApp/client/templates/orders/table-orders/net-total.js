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
import './net-total.html';

// Global Variables
  //Books Ordered
  booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
  var discountCellChanging = false;


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
