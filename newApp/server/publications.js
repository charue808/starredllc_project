import { Orders } from '../lib/collections/orders.js';
import { Catalogs } from '../lib/collections/catalogs.js';

Meteor.publish('catalogs', function catalogPublications() {
  return Catalogs.find();
});

Meteor.publish('orders', function() {
  return Orders.find();
});
