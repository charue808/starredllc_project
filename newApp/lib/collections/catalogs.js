Catalogs = new Mongo.Collection('catalogs');

Catalogs.schema = new SimpleSchema({
  publisher: {
    type: String
  },
  title: {
    type: String
  },
  series: {
    type: String
  },
  isbn: {
    type: Number
  },
  qty: {
    type: Number
  },
  copyright: {
    type: Number
  },
  listPrice: {
    type: Number
  },
  yourPrice: {
    type: Number
  },
  readingLvl: {
    type: String
  },
  atos: {
    type: String
  },
  lexile: {
    type: String
  },
  dewey: {
    type: String,
    optional: true
  }
});
Catalogs.attachSchema(Catalogs.schema);


Meteor.methods({
  parseUpload( data, fileName ) {
    check( data, Array );
    check( fileName, String );

    for ( let i = 0; i < data.length; i++ ) {
      let item  = data[ i ];
      

      if ( item['Title'] ) {
        Catalogs.insert( item );
      } else {
        console.warn( 'Rejected. Invalid item.' );
      }
    }
  }
});
