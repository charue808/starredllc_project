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
	}
});