import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Roles } from 'meteor/alanning:roles';

import { $ } from 'meteor/jquery';
import dataTablesBootstrap from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';
dataTablesBootstrap(window, $);

import { Orders } from '/lib/collections/orders.js';
import { Catalogs } from '/lib/collections/catalogs.js';
import '/lib/common.js';
import './user-price.html';

// Global Variables
  //Books Ordered
  booksOrderedTemp = {};
  var currentOrder;
  var publisherIdTemp;
  var discountCellChanging = false;


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
