Template.updateAccount.events({
  'submit form': function(e) {
    e.preventDefault();
    console.log('click button');
    
    let orgName = $(e.target).find('#inputOrgName').val();
    console.log("this is the org:",orgName);
    let user = Meteor.userId();
    console.log("who is the user:", user);

    Meteor.call('accountUpdate', user, orgName, function(error, result) {
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
