// Code attempt using example from aldeed:tabular

import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import moment from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Catalogs } from '../lib/collections/catalogs.js';
import { Orders } from '../lib/collections/orders.js';


new Tabular.Table({
  name: "Catalogs",
  collection: Catalogs,
  columns: [
    {data: "isbn", title: "ISBN", width:"10%"},
    {data: "title", title: "Title", width:"25%"},
    {data: "series", title: "Series", width:"20%"},
    {data: "copyright", title: "Copyright", width:"5%"},
    {data: "atos", title:"ATOS", width:"5%"},
    {data: "lexile", title:"Lexile", width:"5%"},
    {data: "guidedReading", title:"Guided Reading", width:"5%"},
    {title:"Price", tmpl: Meteor.isClient && Template.priceCell, width:"5%"},
    //{data: "listPrice", title: "List Price", width:"10%"},
    //{data: "yourPrice", title: "Your Price", width:"10%"},
    {title: "Quantity", tmpl: Meteor.isClient && Template.addQTYCell, width:"5%"},
    {title: "Net Total", tmpl: Meteor.isClient && Template.rowTotalCell, width:"5%"},
    {title: "Discount (%)", tmpl: Meteor.isClient && Template.discountCell, width:"20%"}
  ],
  stateSave: true,
  responsive: true,
  autoWidth: false,
  search: {
    smart: true,
    onEnterOnly: false,
  }
});

new Tabular.Table({
  name: "Orders",
  collection: Orders,
  columns: [
    {data: "customerName", title: "School", class:"col-md-1"},
    {data: "publisherId", title: "Publisher", class:"col-md-1"},
    {data: "status", title: "Status", class:"col-md-1"},
    {data: "submitted", title: "Last Update", class:"col-md-3"},
    {title: "Actions:", tmpl: Meteor.isClient && Template.actionCell},
    //{title: "Complete Order", tmpl: Meteor.isClient && Template.statusToCompleteCell}
  ],
  stateSave: true,
  responsive: true,
  autoWidth: false,
  search: {
    smart: true,
    onEnterOnly: false,
  }
});
