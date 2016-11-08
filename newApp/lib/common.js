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
    {data: "title", title: "Title"},
    {data: "series", title: "Series"},
    {data: "isbn", title: "ISBN"},
    {data: "listPrice", title: "List Price"},
    {data: "yourPrice", title: "Your Price"},
    {data: "interestLvl", title: "Interest Level"},
    {data: "readingLvl", title: "Reading Level"},
    {data: "guidedReading", title: "Guided Reading Level"},
    {data: "atos", title: "ATOS"},
    {data: "lexile", title: "Lexile"},
    {data: "author", title: "Author"},
    {data: "copyright", title: "Copyright"}
  ]

});
