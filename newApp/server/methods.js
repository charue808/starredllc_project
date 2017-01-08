import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Catalogs } from '../lib/collections/catalogs.js';
import { Orders } from '../lib/collections/orders.js';

Meteor.methods({
  parseUpload( data, fileName ) {
    check( data, Array );
    check( fileName, String );

    //var publisherName = fileName;
    // fieldMap.ourNameForField = theresasNameForField
    //
    var getFieldMap = function (publisherName){

      // TODO: define field maps
      const capstonefieldMap = {
        "isbn": "ISBN-13",
        "title":"Title",
        "series": "Series",
        "listPrice": "List Price",
        "yourPrice": "Your Price",
        "copyright": "Copyright",
        "interestLvl": "Interest Level",
        "readingLvl": "Reading Level"
      };

      const bearportfieldMap = {
        "title": "Title",
        "series": "Series",
        "numberOfBooks": "Number of books",
        "isbn": "Library Binding ISBN-13",
        "listPrice": "Library Binding List Price",
        "yourPrice": "Your Price",
        "titleDewey": "Dewey",
        "copyright": "Copyright",
        "readingLvl": "Reading Level Grade",
        "interestLvl": "Interest Level Grade",
        "atos": "ATOS",
        "lexile": "Lexile",
        "guidedReading": "Guided Reading",
        "author": "Author"
      };

      const lernerfieldMap = {
        "series": "Series",
        "title": "Title",
        "isbn": "ISBN",
        "listPrice": "List Price",
        "yourPrice": "Your Price",
        "titleDewey": "Title Dewey",
        "seriesDewey": "Series Dewey",
        "copyright": "Copyright",
        "subject": "Subject",
        "readingLvl": "Reading Level",
        "interestLvl": "Interest Level",
        "guidedReading": "GRL",
        "atos": "ATOS",
        "lexile": "Lexile",
        "author": "Author"
      };

      const salemfieldMap = {
        "copyright": "Copyright",
        "isbn": "ISBN",
        "listPrice": "List Price",
        "yourPrice": "Your Price",
        "title": "Title"
      };

      var selectedFieldMap = {};

      // TODO: Define switch statements
      switch (publisherName) {
        case 'capstone' :
          selectedFieldMap = capstonefieldMap;
          break;
        case 'bearport' :
          selectedFieldMap = bearportfieldMap;
          break;
        case 'lerner' :
          selectedFieldMap = lernerfieldMap;
          break;
        case 'salem' :
          selectedFieldMap = salemfieldMap;
          break;
        default:
          console.log("Error: field map not found/defined for publisher: ", publisherName);
          break;
      }

      return selectedFieldMap;

    };


    var getStructuredBook = function(rawBookFromPublisher, structureToUse){

      let structuredBook = {};

      // Loop through the fields of the rawBookFromPublisher,
      //
      for (var publisherField in structureToUse) {

        // for each publisherField (or dictionary key), use the analagous key
        // from the structureToUse
        //
        structuredBook[publisherField] = rawBookFromPublisher[structureToUse[publisherField]];

      }
      return structuredBook;

    };

    for ( let i = 0; i < data.length; i++ ) {
      let unstructuredBook = data[i];
      let bookToInsertStructure = getFieldMap(fileName);

      ///// DEBUG
      //console.log("bookToInsert is: ", unstructuredBook);
      //console.log("bookToInsertStructure is: ", bookToInsertStructure);

      let structuredBook = getStructuredBook(unstructuredBook, bookToInsertStructure);
      //console.log("The UNstructured book is:", unstructuredBook);
      //console.log("The structured book is:", structuredBook);

      // TODO: (Use extend?)  Add the publisher name before insert
      //
      let completeBook = _.extend(structuredBook, {
        publisher: fileName
      });
      //console.log("My isbn is: ", completeBook.isbn );
      // if there is a non empty string in the isbn field then insert completeBook
      //
      if ( completeBook.isbn ) {
        var insertedBookId = Catalogs.insert(completeBook);
        console.log(Catalogs.findOne(insertedBookId));
      } else {
        console.warn( 'Rejected. Invalid Entry.' );
      }
    }
  }
/*
  createOrder(pubId, user, bksOrdered) {
    Orders.upsert({
      status:"In progress",
      publisherId: pubId,
      userId: user._id,
      user: user.username
    }, {
      publisherId: pubId,
      userId: user._id,
      user: user.username,
      status: "In progress",
      submitted: new Date(),
      booksOrdered: bksOrdered
    });
  },

  accountUpdate(userId, profileData) {
    Meteor.users.update({_id:userId}, {$set: {"profile": profileData}});
  }
*/
});

//create order method: create order or update existing order on click save button
Meteor.methods({
  upsertOrder(pubId, custId, custName, bksOrdered) {
    check(pubId, String);
    check(custId, String);
    check(custName, String);
    check(bksOrdered, Object);

    //console.log(bksOrdered);
//changed from upsert to update with upsert set to true
    Orders.upsert({
      status: "In progress",
      publisherId: pubId,
      customerId: custId //add back comma
      //customerName: custName
    },
    {$set:
      {
        publisherId: pubId,
        customerId: custId,
        customerName: custName,
        submitted: new Date(),
        booksOrdered: bksOrdered
      }
    });

  }
});

// update account information
Meteor.methods({
  accountUpdate(userId, profileData) {
    Meteor.users.update({_id:userId}, {$set: {"profile": profileData}});
  }
});
