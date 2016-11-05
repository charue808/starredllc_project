// Set Context for orderId

Template.editOrderContextSet.onRendered(function() {

  Session.set('orderContext', {"id": "12345", "status":"pending"});
});

Template.editOrderContextSet.helpers({
  orderContext() {
   var orderObject =  Session.get('orderContext');
   console.log(orderObject);
   return orderObject;
  }
});

Template.editOrder.helpers({
  status() {
    return Session.get('orderContext');
  }
})
