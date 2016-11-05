// Set Context for orderId

Template.editOrderContextSet.onRendered(function() {

  // Load session variable with (sample) order from Order collection
  //
  let publisherId = FlowRouter.getQueryParam("publisherId");

  Session.set('setOrder', {"publisherName":publisherId, "_id":"", "status": "pending"});
  console.log("This is my  order detail: ", Session.get('setOrder'));
});

Template.editOrderContextSet.helpers({
  orderContext() {
   return Session.get('setOrder');
  }
});

