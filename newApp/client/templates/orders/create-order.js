Template.createOrder.events({
// Selecting a publisher and then selecting next presents user with build order page
  // Next button event
  'click #next'(event) {

    // Find the select element with value of publisher name
    let selected = $("#publisherList option:selected").val();
    console.log("the publisher you selected is: " , selected);
    // throw error if user clicks next and no value has been selected
    
   
    // Route to edit order context set template with parameter of publisherId

  }
});



        // Look for Order Collection documents with publisher name equal to selected element value and order status of current order

        // if order collection document found has publisher name that is true and order status that is current order than return Order document
        // else create new order collection document with publisher name and order status of current order
