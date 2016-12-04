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
    Meteor.call('createOrder', publisherIdTemp, booksOrderedTemp, (error, response)=>{
      if (error) {
        console.log("what is the error:", error)
      } else {
        console.log("Success", response)
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


    /*
    booksOrderTemp[this._id]
    bookId = booksOrderTemp
X    booksOrderTemp[_id] --> '3489uejiofoias'
    bookId = this._id;
    booksOrderTemp[this._id].qty
    booksOrderTemp['3489uejiofoias'] --> {id:"jasjsjs", title:"cat in the hat",
    the underscore id property of the object in booksOrderTemp is that equivalent to javascript this._id
     qty:4}
     booksOrderdTemp = {
     '3489uejiofoias':{
        _id: '3489uejiofoias',
        title: 'cat in the hat',
        ....,
      }
    }

    */
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
    console.log()

    booksOrderedTemp[this._id] = bookDetail;
    console.log("these are the books ordered", booksOrderedTemp);
  }

/*
  // click update order button
  'click .addQtyBtn': function() {

    // Add inputBoxQTY to qty property for currentOrderDetail Object
    //
    var inputBoxSelector = "#qtyEntered-" + this._id;
    var inputBoxQty = $(inputBoxSelector).val();
    console.log("Quantity Entered is: ", inputBoxQty);

    let bookDetail = Catalogs.findOne(this._id);
    console.log("Row Data is:", bookDetail);

    bookDetail.qty = inputBoxQty;
    // Get data from table row that button is in
    //
    //var currentOrderDetail =  Catalogs.findOne(this._id) ;
    //orderDetail.qty = // Grab from the input box;
    //orderDetails.push(orderDetail);
    let currentOrder = Session.get('currentOrderSessionVar');
    currentOrder.status = "In Progress";
    currentOrder.bookDetails[bookDetail._id] = bookDetail;
    console.log("This is the current order data:", currentOrder);
    let currentOrderId = Session.get('currentOrderIdSessionVar'); //Session.get()

    // Create order document with orderId in Order collection
    //
    console.log("Current Order Id is... ", currentOrderId);
    //only insert an order documents with an ID
    //let upsertReturnValue = Orders.upsert({_id:currentOrderId});
    let upsertReturnValue = Orders.upsert({_id:currentOrderId}, {$set: {currentOrder}});
*/

/*
    {$set: {"currentOrder.bookDetails": {id: "_id"} }}
    {$set: {"jerjoierojf": { name: "xyz", qty: 3 }, "jkldjkle": { name: "xyz", qty: 3 } }}
*/
    // Update the order id field of our Order session variable
    //
/*
if(!Session.get('currentOrderIdSessionVar')) {
    Session.set('currentOrderIdSessionVar', upsertReturnValue.insertedId);
  }

    console.log("upsert returns...", upsertReturnValue);

    let orderFetch = Orders.find().fetch();
    console.log("These are all the orders so far:", orderFetch);

    let bodsUpsertReturnValue = BookOrderDetails.insert({
      orderId: currentOrderId,
      submitted: new Date(),
      order: currentOrder,
    });

    console.log("book details upsert returns...", bodsUpsertReturnValue);

    let bodsFetch = BookOrderDetails.find().fetch();
    console.log("These are the books that were ordered:", bodsFetch);

    // On the first
    // orderDetail object with row data
    // insert orderItem into orssder document
    //Orders.upsert({
      //publisherId: publisherName,
      //status: "pending"
    //},{publisherId: publisherName, status: "pending", orderDetails:currentOrderDetails})

  }*/
});
