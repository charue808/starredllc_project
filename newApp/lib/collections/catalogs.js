Catalogs = new Mongo.Collection('catalogs');

Catalogs.schema = new SimpleSchema({
  publisher: {
    type: String
  },
  title: {
    type: String,
    optional: true
  },
  series: {
    type: String,
    optional: true
  },
  isbn: {
    type: String,
    optional: true
  },
  qty: {
    type: String,
    optional: true
  },
  copyright: {
    type: String,
    optional: true
  },
  listPrice: {
    type: String,
    optional: true
  },
  yourPrice: {
    type: String,
    optional: true
  },
  interestLvl: {
    type: String,
    optional: true
  },
  readingLvl: {
    type: String,
    optional: true
  },
  guidedReading: {
    type: String,
    optional: true
  },
  atos: {
    type: String,
    optional: true
  },
  lexile: {
    type: String,
    optional: true
  },
  titleDewey: {
    type: String,
    optional: true
  },
  seriesDewey: {
    type: String,
    optional: true
  },
  numberOfBooks: {
    type: String,
    optional: true
  },
  author: {
    type: String,
    optional: true
  },
  subject: {
    type: String,
    optional: true
  }
});
Catalogs.attachSchema(Catalogs.schema);


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
        "qty": "Quantity Ordered",
        "listPrice": "List Price",
        "yourPrice": "Your Price",
        "copyright": "Copyright",
        "interestLvl": "Interest Level",
        "readingLvl": "Reading Level"
      };

      const bearportfieldMap = {
        "qty": "Quantity Ordered",
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
        "qty": "QTY Ordered",
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
        "qty": "QTY Ordered",
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
      console.log("The UNstructured book is:", unstructuredBook);
      console.log("The structured book is:", structuredBook);

      // TODO: (Use extend?)  Add the publisher name before insert
      //
      let completeBook = _.extend(structuredBook, {
        publisher: fileName
      });
      console.log("My isbn is: ", completeBook.isbn );
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
});