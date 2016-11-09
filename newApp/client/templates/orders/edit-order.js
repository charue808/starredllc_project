import Tabular from 'meteor/aldeed:tabular';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import '/lib/common.js';
import './edit-order.html';

// Set Context for orderId

Template.editOrderContextSet.onRendered(function() {

  // Load session variable with (sample) order from Order collection
  //
  let publisherId = FlowRouter.getQueryParam("publisherId");

  Session.set('setOrder', {"publisherName":publisherId, "_id":"", "status": "pending"});
  console.log("This is my  order detail: ", Session.get('setOrder'));
});

Template.editOrderContextSet.helpers({
  orderContext() {
   return Session.get('setOrder');
  }
});

Template.editOrder.helpers({
  selector() {
    return {publisher: Session.get('setOrder').publisherName};
  }
});
