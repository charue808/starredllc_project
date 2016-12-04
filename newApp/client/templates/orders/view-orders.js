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
