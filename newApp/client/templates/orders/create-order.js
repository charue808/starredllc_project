Template.createOrder.events({
// Selecting a publisher and then selecting next presents user with build order page
  // Next button event
  'click #next'(event) {

    let publisher = document.getElementById('publisherList');
    // throw error if user clicks next and no value has been selected
    if( publisher.selectedIndex == 0 ) {
      // throw error
      Bert.alert('Please select a publisher!', 'danger', 'growl-top-right');
    } else {
      let selectedPublisher = $('#publisherList').val();
      //console.log("did you forget, the publisher you selected is:", selectedPublisher);
      let publisherId = selectedPublisher;
      // Route to edit order contexts
      // Example: FlowRouter.go('/blog/my-post?comments=on&color=dark');

      //FlowRouter.go('/blog/my-post?comments=on&color=dark');
      FlowRouter.go('/edit-order?publisherId='+publisherId);
      // set template with parameter of publisherId
    }

  }
});



        // Look for Order Collection documents with publisher name equal to selected element value and order status of current order

        // if order collection document found has publisher name that is true and order status that is current order than return Order document
        // else create new order collection document with publisher name and order status of current order
