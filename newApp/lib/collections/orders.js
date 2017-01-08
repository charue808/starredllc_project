import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Orders = new Mongo.Collection('orders');


Orders.schema = new SimpleSchema({
  publisherId: {
    type: String
  },
  customerId: {
    type: String
  },
  customerName: {
    type: String
  },
  status: {
    type: String
  },
  submitted: {
    type: Date
  },
  booksOrdered: {
    type: Object,
    blackbox: true
  }
});

Orders.attachSchema(Orders.schema);
