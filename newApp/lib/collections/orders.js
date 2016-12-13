import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Orders = new Mongo.Collection('orders');
/*
Orders.allow({
  update: function() {
    return true;
  }
});


Orders.schema = new SimpleSchema({
  publisherId: {
    type: String
  },
  status: {
    type: String
  },
  submitted: {
    type: Date
  },
  booksOrdered: {
    type: [Object]
  }
});

Orders.attachSchema(Orders.schema);
*/
