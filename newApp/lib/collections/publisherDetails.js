import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const PublisherDetails = new Mongo.Collection('publisherdetails');

PublisherDetails.schema = new SimpleSchema({
  publisherId: {
    type: String
  },
  name: {
    type: String
  },
  doeNum: {
    type: String
  },
  "address.street": {
    type: String
  },
  "address.city": {
    type: String
  },
  "address.state": {
    type: String
  },
  "address.zip": {
    type: String
  },
  tele: {
    type: String
  },
  fax: {
    type: String
  },
  email: {
    type: String
  }
});

PublisherDetails.attachSchema(PublisherDetails.schema);
