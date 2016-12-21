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
import './discount.html';


// Global Variables
  //Books Ordered
  booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
  var discountCellChanging = false;

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

Template.discountCell.helpers({
  currentDiscount() {
    let bookId = this._id;
    let currentBook = booksOrderedTemp[bookId];

    if (currentBook) {
      return currentBook.discount;
    }
  }
});
