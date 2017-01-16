import { AccountsTemplates } from 'meteor/useraccounts:core';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';


Template.uploadAdmin.onCreated( () => {
	Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadAdmin.helpers({
	uploading() {
		return Template.instance().uploading.get();
	}
});

Template.uploadAdmin.events({
	'change [name=uploadPublisherCatalogCSV]'(event, template) {
		template.uploading.set(true);

		Papa.parse(event.target.files[0], {
			header: true,
			dynamicTyping: false,
			complete(results, file) {

				let fileName = event.target.files[0].name.replace(/\.[^/.]+$/, "");
				console.log(fileName);

				Meteor.call('parseUpload', results.data, fileName, ( error, response) => {
					if ( error ) {
						console.log( error.reason );
					} else {
						template.uploading.set( false );
						Bert.alert( 'Upload complete', 'success', 'growl-top-right');
					}
				});
			}
		});
	},
  'submit #publisherDetails'(e, templ) {
    e.preventDefault();

    let details = {
      publisherId: $(e.target).find('#inputPublisherId').val(),
      doeNum: $(e.target).find('#inputDoeNum').val(),
      name: $(e.target).find('#inputPublisherName').val(),
      tele: $(e.target).find('#inputTelNum').val(),
      fax: $(e.target).find('#inputFaxNum').val(),
      email: $(e.target).find('#inputEmail').val(),
      address:{
        street: $(e.target).find('#inputAddressStr').val(),
        city: $(e.target).find('#inputAddressCity').val(),
        state: $(e.target).find('#inputAddressState').val(),
        zip: $(e.target).find('#inputAddressZip').val()
      }

    };

    console.log("these are the details to input: ", details);
    Meteor.call('updatePublisherDetails', details, function(error, results) {
      if (error) {
        console.log(error);
      } else {
        console.log(results);
        Bert.alert('Publisher Details updated', 'success', 'growl-top-right');
        $('#publisherDetails')[0].reset();
      }
    });
  }
});
