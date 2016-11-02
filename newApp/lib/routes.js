FlowRouter.route('/', {
  name: 'layout',
  action() {
    BlazeLayout.render('layout', { content: 'uploadAdmin'})
  }
});


FlowRouter.route('/create-order', {
  name: 'create-order',
  action() {
    BlazeLayout.render('layout', { content: 'createOrder'})
  }
});


FlowRouter.route('/edit-order/:_id', {
  name: 'edit-order',
  action() {
    BlazeLayout.render('layout', { content: 'editOrder'})
  }
});
