// Set Context for orderId

Template.editOrderContextSet.onRendered(function() {
  Session.set('orderContext', {_id:"", status:""});
});

Template.editOrderContextSet.helpers({
  orderContext() {
   return Session.get('orderContext');
  }
});