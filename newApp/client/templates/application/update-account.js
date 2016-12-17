Template.updateAccount.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log('click button');

    let newProfile = {
      fullName: $(e.target).find('#inputfullName').val(),
      org: $(e.target).find('#inputOrgName').val(),
      tel: $(e.target).find('#inputTelNum').val(),
      fax: $(e.target).find('#inputFaxNum').val(),
      address: {
        street: $(e.target).find('#inputAddressStr').val(),
        city: $(e.target).find('#inputAddressCity').val(),
        state: $(e.target).find('#inputAddressState').val(),
        zip: $(e.target).find('#inputAddressZip').val(),
      }
    };

    console.log("this is the profile:", newProfile);
    let user = Meteor.userId();
    console.log("who is the user:", user);

    Meteor.call('accountUpdate', user, newProfile, function(error, result) {
      if (error) {
        console.log(error.reason);
      } else {
        Bert.alert('Update complete!', 'success', 'growl-top-right');
      }
    });
    //let newAddress = fromFromID.val()
    //Meteor.call('updateAccount', Meteor.userId, newAddress);
  },
  'click a[data-action=homeRoute]': function(e) {
    e.preventDefault();
    FlowRouter.go('/');
  }
});

/*

populate form with information in Meteor.userId
check what is in there in the values

*/
