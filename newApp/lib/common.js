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
    {data: "isbn", title: "ISBN", width:"10%"},
    {data: "title", title: "Title", width:"25%"},
    {data: "series", title: "Series", width: "15%"},
    {data: "copyright", title: "Copyright", width:"5%"},
    {data: "atos", title:"ATOS", width:"5%"},
    {data: "lexile", title:"Lexile", width: "5%"},
    {data: "guidedReading", title:"Guided Reading", width:"5%"},
    {data: "listPrice", title: "List Price", width:"5%"},
    {data: "yourPrice", title: "Your Price", width:"5%"},
    {title: "Quantity", tmpl: Meteor.isClient && Template.inputQTYCell, width:"5%"},
    {tmpl: Meteor.isClient && Template.addQTYCell, width:"5%"}
  ],
  responsive: true,
  autoWidth: false,
  search: {
    smart: true,
    onEnterOnly: false,
  }
});
