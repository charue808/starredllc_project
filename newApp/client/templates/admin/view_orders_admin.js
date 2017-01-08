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
import './view_orders_admin.html';


/* Abandoned Selector as total order collection can be publisherId
Template.viewOrdersAdmin.helpers({
  orderSelectorHelper() {

  }
});
*/

Template.actionCell.events({
  'click #toEditOrder': function(e) {
      console.log('clicked');
      let currentOrder = Orders.findOne(this._id);
      console.log("this is the current order row", currentOrder);
      let publisherId = currentOrder.publisherId;
      let customerId = currentOrder.customerId;
      let customerName = currentOrder.customerName;
      FlowRouter.go('/edit-order?publisherId='+ publisherId + '&customerId='+customerId +'&customerName=' + customerName);
  }
});
