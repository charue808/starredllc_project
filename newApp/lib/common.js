// Code attempt using example from aldeed:tabular

import Tabular from 'meteor/aldeed:tabular';
import { Template } from 'meteor/templating';
import moment from 'meteor/momentjs:moment';
import { Meteor } from 'meteor/meteor';
import { Catalogs } from '../lib/collections/catalogs.js';


new Tabular.Table({
  name: "Catalogs",
  collection: Catalogs,
  columns: [
    {data: "isbn", title: "ISBN", width:"250px"},
    {data: "title", title: "Title", width:"250px"},
    {data: "copyright", title: "Copyright"},
    {data: "listPrice", title: "List Price"},
    {data: "yourPrice", title: "Your Price"},
    {title: "Quantity", tmpl: Meteor.isClient && Template.inputQTYCell},
    {tmpl: Meteor.isClient && Template.addQTYCell}
  ],
  responsive: true,
  autoWidth: false,
  search: {
    smart: true,
    onEnterOnly: false,
  }
});
